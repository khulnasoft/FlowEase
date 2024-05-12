/* eslint-disable flowease-nodes-base/node-dirname-against-convention */
import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'flowease-workflow';
import { WikipediaQueryRun } from '@langchain/community/tools/wikipedia_query_run';
import { logWrapper } from '../../../utils/logWrapper';
import { getConnectionHintNoticeField } from '../../../utils/sharedFields';

export class ToolWikipedia implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wikipedia',
		name: 'toolWikipedia',
		icon: 'file:wikipedia.svg',
		group: ['transform'],
		version: 1,
		description: 'Search in Wikipedia',
		defaults: {
			name: 'Wikipedia',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Tools'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.flowease.khulnasoft.com/integrations/builtin/cluster-nodes/sub-nodes/flowease-nodes-langchain.toolwikipedia/',
					},
				],
			},
		},
		// eslint-disable-next-line flowease-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		// eslint-disable-next-line flowease-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiTool],
		outputNames: ['Tool'],
		properties: [getConnectionHintNoticeField([NodeConnectionType.AiAgent])],
	};

	async supplyData(this: IExecuteFunctions): Promise<SupplyData> {
		const WikiTool = new WikipediaQueryRun();

		WikiTool.description =
			'A tool for interacting with and fetching data from the Wikipedia API. The input should always be a string query.';

		return {
			response: logWrapper(WikiTool, this),
		};
	}
}
