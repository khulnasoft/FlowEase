import type {
	IExecuteFunctions,
	IExecuteWorkflowInfo,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IWorkflowBase,
	SupplyData,
	ExecutionError,
	IDataObject,
} from 'flowease-workflow';
import { NodeConnectionType, NodeOperationError } from 'flowease-workflow';
import type {
	SetField,
	SetNodeOptions,
} from 'flowease-nodes-base/dist/nodes/Set/v2/helpers/interfaces';
import * as manual from 'flowease-nodes-base/dist/nodes/Set/v2/manual.mode';

import { DynamicTool } from '@langchain/core/tools';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import type { CallbackManagerForToolRun } from '@langchain/core/callbacks/manager';
import { getConnectionHintNoticeField } from '../../../utils/sharedFields';

export class ToolWorkflow implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Custom flowease Workflow Tool',
		name: 'toolWorkflow',
		icon: 'fa:network-wired',
		group: ['transform'],
		version: [1, 1.1],
		description:
			'Uses another flowease workflow as a tool. Allows packaging any flowease node(s) as a tool.',
		defaults: {
			name: 'Custom flowease Workflow Tool',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Tools'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.flowease.khulnasoft.com/integrations/builtin/cluster-nodes/sub-nodes/flowease-nodes-langchain.toolworkflow/',
					},
				],
			},
		},
		// eslint-disable-next-line flowease-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		// eslint-disable-next-line flowease-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiTool],
		outputNames: ['Tool'],
		properties: [
			getConnectionHintNoticeField([NodeConnectionType.AiAgent]),
			{
				displayName:
					'See an example of a workflow to suggest meeting slots using AI <a href="/templates/1953" target="_blank">here</a>.',
				name: 'noticeTemplateExample',
				type: 'notice',
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				placeholder: 'My_Color_Tool',
				displayOptions: {
					show: {
						'@version': [1],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				placeholder: 'e.g. My_Color_Tool',
				validateType: 'string-alphanumeric',
				description:
					'The name of the function to be called, could contain letters, numbers, and underscores only',
				displayOptions: {
					show: {
						'@version': [{ _cnd: { gte: 1.1 } }],
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				placeholder:
					'Call this tool to get a random color. The input should be a string with comma separted names of colors to exclude.',
				typeOptions: {
					rows: 3,
				},
			},

			{
				displayName:
					'This tool will call the workflow you define below, and look in the last node for the response. The workflow needs to start with an Execute Workflow trigger',
				name: 'executeNotice',
				type: 'notice',
				default: '',
			},

			{
				displayName: 'Source',
				name: 'source',
				type: 'options',
				options: [
					{
						name: 'Database',
						value: 'database',
						description: 'Load the workflow from the database by ID',
					},
					{
						name: 'Define Below',
						value: 'parameter',
						description: 'Pass the JSON code of a workflow',
					},
				],
				default: 'database',
				description: 'Where to get the workflow to execute from',
			},

			// ----------------------------------
			//         source:database
			// ----------------------------------
			{
				displayName: 'Workflow ID',
				name: 'workflowId',
				type: 'string',
				displayOptions: {
					show: {
						source: ['database'],
					},
				},
				default: '',
				required: true,
				description: 'The workflow to execute',
				hint: 'Can be found in the URL of the workflow',
			},

			// ----------------------------------
			//         source:parameter
			// ----------------------------------
			{
				displayName: 'Workflow JSON',
				name: 'workflowJson',
				type: 'json',
				typeOptions: {
					rows: 10,
				},
				displayOptions: {
					show: {
						source: ['parameter'],
					},
				},
				default: '\n\n\n\n\n\n\n\n\n',
				required: true,
				description: 'The workflow JSON code to execute',
			},
			// ----------------------------------
			//         For all
			// ----------------------------------
			{
				displayName: 'Field to Return',
				name: 'responsePropertyName',
				type: 'string',
				default: 'response',
				required: true,
				hint: 'The field in the last-executed node of the workflow that contains the response',
				description:
					'Where to find the data that this tool should return. flowease will look in the output of the last-executed node of the workflow for a field with this name, and return its value.',
			},
			{
				displayName: 'Extra Workflow Inputs',
				name: 'fields',
				placeholder: 'Add Value',
				type: 'fixedCollection',
				description:
					"These will be output by the 'execute workflow' trigger of the workflow being called",
				typeOptions: {
					multipleValues: true,
					sortable: true,
				},
				default: {},
				options: [
					{
						name: 'values',
						displayName: 'Values',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								placeholder: 'e.g. fieldName',
								description:
									'Name of the field to set the value of. Supports dot-notation. Example: data.person[0].name.',
								requiresDataPath: 'single',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								description: 'The field value type',
								// eslint-disable-next-line flowease-nodes-base/node-param-options-type-unsorted-items
								options: [
									{
										name: 'String',
										value: 'stringValue',
									},
									{
										name: 'Number',
										value: 'numberValue',
									},
									{
										name: 'Boolean',
										value: 'booleanValue',
									},
									{
										name: 'Array',
										value: 'arrayValue',
									},
									{
										name: 'Object',
										value: 'objectValue',
									},
								],
								default: 'stringValue',
							},
							{
								displayName: 'Value',
								name: 'stringValue',
								type: 'string',
								default: '',
								displayOptions: {
									show: {
										type: ['stringValue'],
									},
								},
								validateType: 'string',
								ignoreValidationDuringExecution: true,
							},
							{
								displayName: 'Value',
								name: 'numberValue',
								type: 'string',
								default: '',
								displayOptions: {
									show: {
										type: ['numberValue'],
									},
								},
								validateType: 'number',
								ignoreValidationDuringExecution: true,
							},
							{
								displayName: 'Value',
								name: 'booleanValue',
								type: 'options',
								default: 'true',
								options: [
									{
										name: 'True',
										value: 'true',
									},
									{
										name: 'False',
										value: 'false',
									},
								],
								displayOptions: {
									show: {
										type: ['booleanValue'],
									},
								},
								validateType: 'boolean',
								ignoreValidationDuringExecution: true,
							},
							{
								displayName: 'Value',
								name: 'arrayValue',
								type: 'string',
								default: '',
								placeholder: 'e.g. [ arrayItem1, arrayItem2, arrayItem3 ]',
								displayOptions: {
									show: {
										type: ['arrayValue'],
									},
								},
								validateType: 'array',
								ignoreValidationDuringExecution: true,
							},
							{
								displayName: 'Value',
								name: 'objectValue',
								type: 'json',
								default: '={}',
								typeOptions: {
									rows: 2,
								},
								displayOptions: {
									show: {
										type: ['objectValue'],
									},
								},
								validateType: 'object',
								ignoreValidationDuringExecution: true,
							},
						],
					},
				],
			},
		],
	};

	async supplyData(this: IExecuteFunctions, itemIndex: number): Promise<SupplyData> {
		const name = this.getNodeParameter('name', itemIndex) as string;
		const description = this.getNodeParameter('description', itemIndex) as string;

		const runFunction = async (
			query: string,
			runManager?: CallbackManagerForToolRun,
		): Promise<string> => {
			const source = this.getNodeParameter('source', itemIndex) as string;
			const responsePropertyName = this.getNodeParameter(
				'responsePropertyName',
				itemIndex,
			) as string;

			if (!responsePropertyName) {
				throw new NodeOperationError(this.getNode(), "Field to return can't be empty", {
					itemIndex,
					description:
						'Enter the name of a field in the last node of the workflow that contains the response to return',
				});
			}

			const workflowInfo: IExecuteWorkflowInfo = {};
			if (source === 'database') {
				// Read workflow from database
				workflowInfo.id = this.getNodeParameter('workflowId', itemIndex) as string;
			} else if (source === 'parameter') {
				// Read workflow from parameter
				const workflowJson = this.getNodeParameter('workflowJson', itemIndex) as string;
				try {
					workflowInfo.code = JSON.parse(workflowJson) as IWorkflowBase;
				} catch (error) {
					throw new NodeOperationError(
						this.getNode(),
						`The provided workflow is not valid JSON: "${(error as Error).message}"`,
						{
							itemIndex,
						},
					);
				}
			}

			const rawData: IDataObject = { query };

			const workflowFieldsJson = this.getNodeParameter('fields.values', itemIndex, [], {
				rawExpressions: true,
			}) as SetField[];

			// Copied from Set Node v2
			for (const entry of workflowFieldsJson) {
				if (entry.type === 'objectValue' && (entry.objectValue as string).startsWith('=')) {
					rawData[entry.name] = (entry.objectValue as string).replace(/^=+/, '');
				}
			}

			const options: SetNodeOptions = {
				include: 'all',
			};

			const newItem = await manual.execute.call(
				this,
				{ json: { query } },
				itemIndex,
				options,
				rawData,
				this.getNode(),
			);

			const items = [newItem] as INodeExecutionData[];

			let receivedData: INodeExecutionData;
			try {
				receivedData = (await this.executeWorkflow(
					workflowInfo,
					items,
					runManager?.getChild(),
				)) as INodeExecutionData;
			} catch (error) {
				// Make sure a valid error gets returned that can by json-serialized else it will
				// not show up in the frontend
				throw new NodeOperationError(this.getNode(), error as Error);
			}

			const response: string | undefined = get(receivedData, [
				0,
				0,
				'json',
				responsePropertyName,
			]) as string | undefined;
			if (response === undefined) {
				throw new NodeOperationError(
					this.getNode(),
					`There was an error: "The workflow did not return an item with the property '${responsePropertyName}'"`,
				);
			}

			return response;
		};

		return {
			response: new DynamicTool({
				name,
				description,

				func: async (query: string, runManager?: CallbackManagerForToolRun): Promise<string> => {
					const { index } = this.addInputData(NodeConnectionType.AiTool, [[{ json: { query } }]]);

					let response: string = '';
					let executionError: ExecutionError | undefined;
					try {
						response = await runFunction(query, runManager);
					} catch (error) {
						// TODO: Do some more testing. Issues here should actually fail the workflow
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						executionError = error;
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
						response = `There was an error: "${error.message}"`;
					}

					if (typeof response === 'number') {
						response = (response as number).toString();
					}

					if (isObject(response)) {
						response = JSON.stringify(response, null, 2);
					}

					if (typeof response !== 'string') {
						// TODO: Do some more testing. Issues here should actually fail the workflow
						executionError = new NodeOperationError(this.getNode(), 'Wrong output type returned', {
							description: `The response property should be a string, but it is an ${typeof response}`,
						});
						response = `There was an error: "${executionError.message}"`;
					}

					if (executionError) {
						void this.addOutputData(NodeConnectionType.AiTool, index, executionError);
					} else {
						void this.addOutputData(NodeConnectionType.AiTool, index, [[{ json: { response } }]]);
					}
					return response;
				},
			}),
		};
	}
}
