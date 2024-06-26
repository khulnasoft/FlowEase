import nock from 'nock';
import type { INodeTypes } from 'flowease-workflow';
import { setup, workflowToTests, getWorkflowFilenames } from '@test/nodes/Helpers';

import { executeWorkflow } from '@test/nodes/ExecuteWorkflow';

import type { WorkflowTestData } from '@test/nodes/types';

describe('Test Flowease Node, expect base_url to be received from credentials', () => {
	const workflows = getWorkflowFilenames(__dirname);
	const tests = workflowToTests(workflows);

	beforeAll(() => {
		nock.disableNetConnect();

		//base url is set in fake credentials map packages/nodes-base/test/nodes/FakeCredentialsMap.ts
		const baseUrl = 'https://test.app.flowease.cloud/api/v1';
		nock(baseUrl).get('/workflows?tags=flowease-test').reply(200, {});
	});

	afterAll(() => {
		nock.restore();
	});

	const nodeTypes = setup(tests);

	const testNode = async (testData: WorkflowTestData, types: INodeTypes) => {
		const { result } = await executeWorkflow(testData, types);

		expect(result.finished).toEqual(true);
	};

	for (const testData of tests) {
		test(testData.description, async () => await testNode(testData, nodeTypes));
	}
});
