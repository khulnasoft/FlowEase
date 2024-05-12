import { v4 as uuid } from 'uuid';
import { SecurityAuditService } from '@/security-audit/SecurityAudit.service';
import { INSTANCE_REPORT, WEBHOOK_VALIDATOR_NODE_TYPES } from '@/security-audit/constants';
import {
	getRiskSection,
	saveManualTriggerWorkflow,
	MOCK_09990_N8N_VERSION,
	simulateOutdatedInstanceOnce,
	simulateUpToDateInstance,
} from './utils';
import * as testDb from '../shared/testDb';
import { toReportTitle } from '@/security-audit/utils';
import config from '@/config';
import { generateNanoId } from '@db/utils/generators';
import { WorkflowRepository } from '@db/repositories/workflow.repository';
import Container from 'typedi';

let securityAuditService: SecurityAuditService;

beforeAll(async () => {
	await testDb.init();

	securityAuditService = new SecurityAuditService(Container.get(WorkflowRepository));

	simulateUpToDateInstance();
});

beforeEach(async () => {
	await testDb.truncate(['Workflow']);
});

afterAll(async () => {
	await testDb.terminate();
});

test('should report webhook lacking authentication', async () => {
	const targetNodeId = uuid();

	const details = {
		id: generateNanoId(),
		name: 'My Test Workflow',
		active: true,
		nodeTypes: {},
		connections: {},
		nodes: [
			{
				parameters: {
					path: uuid(),
					options: {},
				},
				id: targetNodeId,
				name: 'Webhook',
				type: 'flowease-nodes-base.webhook',
				typeVersion: 1,
				position: [0, 0] as [number, number],
				webhookId: uuid(),
			},
		],
	};

	await Container.get(WorkflowRepository).save(details);

	const testAudit = await securityAuditService.run(['instance']);

	const section = getRiskSection(
		testAudit,
		INSTANCE_REPORT.RISK,
		INSTANCE_REPORT.SECTIONS.UNPROTECTED_WEBHOOKS,
	);

	if (!section.location) {
		fail('Expected section to have locations');
	}

	expect(section.location).toHaveLength(1);

	expect(section.location[0].nodeId).toBe(targetNodeId);
});

test('should not report webhooks having basic or header auth', async () => {
	const promises = ['basicAuth', 'headerAuth'].map(async (authType) => {
		const details = {
			id: generateNanoId(),
			name: 'My Test Workflow',
			active: true,
			nodeTypes: {},
			connections: {},
			nodes: [
				{
					parameters: {
						path: uuid(),
						authentication: authType,
						options: {},
					},
					id: uuid(),
					name: 'Webhook',
					type: 'flowease-nodes-base.webhook',
					typeVersion: 1,
					position: [0, 0] as [number, number],
					webhookId: uuid(),
				},
			],
		};

		return await Container.get(WorkflowRepository).save(details);
	});

	await Promise.all(promises);

	const testAudit = await securityAuditService.run(['instance']);

	if (Array.isArray(testAudit)) fail('Audit is empty');

	const report = testAudit[toReportTitle('instance')];

	if (!report) {
		fail('Expected test audit to have instance risk report');
	}

	for (const section of report.sections) {
		expect(section.title).not.toBe(INSTANCE_REPORT.SECTIONS.UNPROTECTED_WEBHOOKS);
	}
});

test('should not report webhooks validated by direct children', async () => {
	const promises = [...WEBHOOK_VALIDATOR_NODE_TYPES].map(async (nodeType) => {
		const details = {
			id: generateNanoId(),
			name: 'My Test Workflow',
			active: true,
			nodeTypes: {},
			nodes: [
				{
					parameters: {
						path: uuid(),
						options: {},
					},
					id: uuid(),
					name: 'Webhook',
					type: 'flowease-nodes-base.webhook',
					typeVersion: 1,
					position: [0, 0] as [number, number],
					webhookId: uuid(),
				},
				{
					id: uuid(),
					name: 'My Node',
					type: nodeType,
					typeVersion: 1,
					position: [0, 0] as [number, number],
				},
			],
			connections: {
				Webhook: {
					main: [
						[
							{
								node: 'My Node',
								type: 'main',
								index: 0,
							},
						],
					],
				},
			},
		};

		return await Container.get(WorkflowRepository).save(details);
	});

	await Promise.all(promises);

	const testAudit = await securityAuditService.run(['instance']);
	if (Array.isArray(testAudit)) fail('audit is empty');

	const report = testAudit[toReportTitle('instance')];
	if (!report) {
		fail('Expected test audit to have instance risk report');
	}

	for (const section of report.sections) {
		expect(section.title).not.toBe(INSTANCE_REPORT.SECTIONS.UNPROTECTED_WEBHOOKS);
	}
});

test('should not report non-webhook node', async () => {
	await saveManualTriggerWorkflow();

	const testAudit = await securityAuditService.run(['instance']);
	if (Array.isArray(testAudit)) fail('audit is empty');

	const report = testAudit[toReportTitle('instance')];

	if (!report) {
		fail('Expected test audit to have instance risk report');
	}

	for (const section of report.sections) {
		expect(section.title).not.toBe(INSTANCE_REPORT.SECTIONS.UNPROTECTED_WEBHOOKS);
	}
});

test('should report outdated instance when outdated', async () => {
	simulateOutdatedInstanceOnce();

	const testAudit = await securityAuditService.run(['instance']);

	const section = getRiskSection(
		testAudit,
		INSTANCE_REPORT.RISK,
		INSTANCE_REPORT.SECTIONS.OUTDATED_INSTANCE,
	);

	if (!section.nextVersions) {
		fail('Expected section to have next versions');
	}

	expect(section.nextVersions).toHaveLength(1);

	expect(section.nextVersions[0].name).toBe(MOCK_09990_N8N_VERSION.name);
});

test('should not report outdated instance when up to date', async () => {
	const testAudit = await securityAuditService.run(['instance']);
	if (Array.isArray(testAudit)) fail('audit is empty');

	const report = testAudit[toReportTitle('instance')];
	if (!report) {
		fail('Expected test audit to have instance risk report');
	}

	for (const section of report.sections) {
		expect(section.title).not.toBe(INSTANCE_REPORT.SECTIONS.OUTDATED_INSTANCE);
	}
});

test('should report security settings', async () => {
	config.set('diagnostics.enabled', true);

	const testAudit = await securityAuditService.run(['instance']);

	const section = getRiskSection(
		testAudit,
		INSTANCE_REPORT.RISK,
		INSTANCE_REPORT.SECTIONS.SECURITY_SETTINGS,
	);

	expect(section.settings).toMatchObject({
		features: {
			communityPackagesEnabled: true,
			versionNotificationsEnabled: true,
			templatesEnabled: true,
			publicApiEnabled: false,
		},
		nodes: { nodesExclude: 'none', nodesInclude: 'none' },
		telemetry: { diagnosticsEnabled: true },
	});
});
