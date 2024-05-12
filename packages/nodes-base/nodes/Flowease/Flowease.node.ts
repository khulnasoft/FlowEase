import type { INodeType, INodeTypeDescription } from 'flowease-workflow';
import { auditFields, auditOperations } from './AuditDescription';
import { credentialFields, credentialOperations } from './CredentialDescription';
import { executionFields, executionOperations } from './ExecutionDescription';
import { workflowFields, workflowOperations } from './WorkflowDescription';
import { searchWorkflows } from './WorkflowLocator';

/**
 * The flowease node provides access to the flowease API.
 *
 * See: https://docs.flowease.khulnasoft.com/api/api-reference/
 */
export class Flowease implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'flowease',
		name: 'flowease',
		icon: 'file:flowease.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Handle events and perform actions on your flowease instance',
		defaults: {
			name: 'flowease',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'floweaseApi',
				required: true,
			},
		],
		requestDefaults: {
			returnFullResponse: true,
			baseURL: '={{ $credentials.baseUrl.replace(new RegExp("/$"), "") }}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Audit',
						value: 'audit',
					},
					{
						name: 'Credential',
						value: 'credential',
					},
					{
						name: 'Execution',
						value: 'execution',
					},
					{
						name: 'Workflow',
						value: 'workflow',
					},
				],
				default: 'workflow',
			},

			...auditOperations,
			...auditFields,

			...credentialOperations,
			...credentialFields,

			...executionOperations,
			...executionFields,

			...workflowOperations,
			...workflowFields,
		],
	};

	methods = {
		listSearch: {
			// Provide workflows search capability for the workflow resourceLocator
			searchWorkflows,
		},
	};
}
