import type { INodeTypeBaseDescription, IVersionedNodeType } from 'flowease-workflow';
import { VersionedNodeType } from 'flowease-workflow';

import { MergeV1 } from './v1/MergeV1.node';
import { MergeV2 } from './v2/MergeV2.node';

export class Merge extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Merge',
			name: 'merge',
			icon: 'file:merge.svg',
			group: ['transform'],
			subtitle: '={{$parameter["mode"]}}',
			description: 'Merges data of multiple streams once data from both is available',
			defaultVersion: 2.1,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new MergeV1(baseDescription),
			2: new MergeV2(baseDescription),
			2.1: new MergeV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
