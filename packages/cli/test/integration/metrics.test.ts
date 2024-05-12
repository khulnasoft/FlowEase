import { Container } from 'typedi';
import { parse as semverParse } from 'semver';
import request from 'supertest';

import config from '@/config';
import { FLOWEASE_VERSION } from '@/constants';
import { MetricsService } from '@/services/metrics.service';
import { ExecutionDataRecoveryService } from '@/eventbus/executionDataRecovery.service';

import { setupTestServer } from './shared/utils';
import { mockInstance } from '../shared/mocking';

mockInstance(ExecutionDataRecoveryService);
jest.unmock('@/eventbus/MessageEventBus/MessageEventBus');
config.set('endpoints.metrics.enable', true);
config.set('endpoints.metrics.includeDefaultMetrics', false);
config.set('endpoints.metrics.prefix', 'flowease_test_');
const testServer = setupTestServer({ endpointGroups: ['metrics'] });

let testAgent = request.agent(testServer.app);

async function getMetricsResponseAsLines() {
	const response = await testAgent.get('/metrics');
	expect(response.status).toEqual(200);
	expect(response.type).toEqual('text/plain');

	const lines = response.text.trim().split('\n');
	return lines;
}

describe('Metrics', () => {
	it('should return flowease version', async () => {
		const floweaseVersion = semverParse(FLOWEASE_VERSION || '0.0.0');
		expect(floweaseVersion).toBeTruthy();
		const lines = await getMetricsResponseAsLines();
		expect(lines).toContain(
			`flowease_test_version_info{version="v${floweaseVersion!.version}",major="${
				floweaseVersion!.major
			}",minor="${floweaseVersion!.minor}",patch="${floweaseVersion!.patch}"} 1`,
		);
	});

	it('should return cache metrics when enabled', async () => {
		config.set('endpoints.metrics.includeCacheMetrics', true);
		await Container.get(MetricsService).configureMetrics(testServer.app);
		const lines = await getMetricsResponseAsLines();
		expect(lines).toContain('flowease_test_cache_hits_total 0');
		expect(lines).toContain('flowease_test_cache_misses_total 0');
		expect(lines).toContain('flowease_test_cache_updates_total 0');
	});

	// TODO: Commented out due to flakiness in CI
	// it('should return event metrics when enabled', async () => {
	// 	config.set('endpoints.metrics.includeMessageEventBusMetrics', true);
	// 	await Container.get(MetricsService).configureMetrics(testServer.app);
	// 	await eventBus.initialize();
	// 	await eventBus.send(
	// 		new EventMessageGeneric({
	// 			eventName: 'flowease.destination.test',
	// 		}),
	// 	);
	// 	const lines = await getMetricsResponseAsLines();
	// 	expect(lines).toContain('flowease_test_destination_test_total 1');
	// 	await eventBus.close();
	// 	jest.mock('@/eventbus/MessageEventBus/MessageEventBus');
	// });

	it('should return default metrics', async () => {
		config.set('endpoints.metrics.includeDefaultMetrics', true);
		await Container.get(MetricsService).configureMetrics(testServer.app);
		const lines = await getMetricsResponseAsLines();
		expect(lines).toContain('nodejs_heap_space_size_total_bytes{space="read_only"} 0');
		config.set('endpoints.metrics.includeDefaultMetrics', false);
	});

	it('should not return default metrics only when disabled', async () => {
		config.set('endpoints.metrics.includeDefaultMetrics', false);
		await Container.get(MetricsService).configureMetrics(testServer.app);
		const lines = await getMetricsResponseAsLines();
		expect(lines).not.toContain('nodejs_heap_space_size_total_bytes{space="read_only"} 0');
		config.set('endpoints.metrics.includeDefaultMetrics', true);
	});
});
