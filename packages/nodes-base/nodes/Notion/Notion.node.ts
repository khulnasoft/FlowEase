import type { INodeTypeBaseDescription, IVersionedNodeType } from 'flowease-workflow';
import { VersionedNodeType } from 'flowease-workflow';

import { NotionV1 } from './v1/NotionV1.node';
import { NotionV2 } from './v2/NotionV2.node';

export class Notion extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Notion',
			name: 'notion',
			icon: 'file:notion.svg',
			group: ['output'],
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
			description: 'Consume Notion API',
			defaultVersion: 2.2,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new NotionV1(baseDescription),
			2: new NotionV2(baseDescription),
			2.1: new NotionV2(baseDescription),
			2.2: new NotionV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
