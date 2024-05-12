/* eslint-disable flowease-nodes-base/node-dirname-against-convention */
import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'flowease-workflow';
import { WolframAlphaTool } from '@langchain/community/tools/wolframalpha';
import { logWrapper } from '../../../utils/logWrapper';
import { getConnectionHintNoticeField } from '../../../utils/sharedFields';

export class ToolWolframAlpha implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wolfram|Alpha',
		name: 'toolWolframAlpha',
		icon: 'file:wolfram-alpha.svg',
		group: ['transform'],
		version: 1,
		description: "Connects to WolframAlpha's computational intelligence engine.",
		defaults: {
			name: 'Wolfram Alpha',
		},
		credentials: [
			{
				name: 'wolframAlphaApi',
				required: true,
			},
		],
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Tools'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.flowease.khulnasoft.com/integrations/builtin/cluster-nodes/sub-nodes/flowease-nodes-langchain.toolwolframalpha/',
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
		const credentials = await this.getCredentials('wolframAlphaApi');

		return {
			response: logWrapper(new WolframAlphaTool({ appid: credentials.appId as string }), this),
		};
	}
}
