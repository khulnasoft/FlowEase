/* eslint-disable flowease-nodes-base/node-filename-against-convention */

import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'flowease-workflow';

import { listSearch, loadOptions } from './methods';

import { router } from './actions/router';

import { versionDescription } from './actions/versionDescription';

export class DiscordV2 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...versionDescription,
		};
	}

	methods = {
		listSearch,
		loadOptions,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return await router.call(this);
	}
}
