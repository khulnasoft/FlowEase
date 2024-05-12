import type { INodeProperties } from 'n8n-workflow';

export const pushFields: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		displayOptions: {
			show: {
				operation: ['push'],
			},
		},
		placeholder: 'Add Option',
		default: {},
		options: [
			{
				displayName: 'Target Repository',
				name: 'targetRepository',
				type: 'string',
				default: '',
				placeholder: 'https://github.com/khulnasoft/flowease',
				description: 'The URL or path of the repository to push to',
			},
		],
	},
];
