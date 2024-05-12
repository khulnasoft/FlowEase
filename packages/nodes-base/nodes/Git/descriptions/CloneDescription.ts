import type { INodeProperties } from 'n8n-workflow';

export const cloneFields: INodeProperties[] = [
	{
		displayName: 'Source Repository',
		name: 'sourceRepository',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['clone'],
			},
		},
		default: '',
		placeholder: 'https://github.com/khulnasoft/flowease',
		description: 'The URL or path of the repository to clone',
		required: true,
	},
];
