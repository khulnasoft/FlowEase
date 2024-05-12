/* eslint-disable flowease-nodes-base/node-dirname-against-convention */
import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'flowease-workflow';
import { OutputFixingParser } from 'langchain/output_parsers';
import type { BaseOutputParser } from '@langchain/core/output_parsers';
import type { BaseLanguageModel } from '@langchain/core/language_models/base';
import { logWrapper } from '../../../utils/logWrapper';
import { getConnectionHintNoticeField } from '../../../utils/sharedFields';

export class OutputParserAutofixing implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Auto-fixing Output Parser',
		name: 'outputParserAutofixing',
		icon: 'fa:tools',
		group: ['transform'],
		version: 1,
		description: 'Automatically fix the output if it is not in the correct format',
		defaults: {
			name: 'Auto-fixing Output Parser',
		},

		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Output Parsers'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.flowease.khulnasoft.com/integrations/builtin/cluster-nodes/sub-nodes/flowease-nodes-langchain.outputparserautofixing/',
					},
				],
			},
		},
		// eslint-disable-next-line flowease-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [
			{
				displayName: 'Model',
				maxConnections: 1,
				type: NodeConnectionType.AiLanguageModel,
				required: true,
			},
			{
				displayName: 'Output Parser',
				maxConnections: 1,
				required: true,
				type: NodeConnectionType.AiOutputParser,
			},
		],
		// eslint-disable-next-line flowease-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiOutputParser],
		outputNames: ['Output Parser'],
		properties: [
			{
				displayName:
					'This node wraps another output parser. If the first one fails it calls an LLM to fix the format',
				name: 'info',
				type: 'notice',
				default: '',
			},
			getConnectionHintNoticeField([NodeConnectionType.AiChain, NodeConnectionType.AiAgent]),
		],
	};

	async supplyData(this: IExecuteFunctions, itemIndex: number): Promise<SupplyData> {
		const model = (await this.getInputConnectionData(
			NodeConnectionType.AiLanguageModel,
			itemIndex,
		)) as BaseLanguageModel;
		const outputParser = (await this.getInputConnectionData(
			NodeConnectionType.AiOutputParser,
			itemIndex,
		)) as BaseOutputParser;

		const parser = OutputFixingParser.fromLLM(model, outputParser);

		return {
			response: logWrapper(parser, this),
		};
	}
}
