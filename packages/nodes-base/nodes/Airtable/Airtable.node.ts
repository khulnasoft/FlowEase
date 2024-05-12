import type { INodeTypeBaseDescription, IVersionedNodeType } from 'flowease-workflow';
import { VersionedNodeType } from 'flowease-workflow';

import { AirtableV1 } from './v1/AirtableV1.node';
import { AirtableV2 } from './v2/AirtableV2.node';

export class Airtable extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Airtable',
			name: 'airtable',
			icon: 'file:airtable.svg',
			group: ['input'],
			description: 'Read, update, write and delete data from Airtable',
			defaultVersion: 2,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new AirtableV1(baseDescription),
			2: new AirtableV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
