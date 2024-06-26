import type { INodeProperties } from 'flowease-workflow';
import { includeInputFields } from './common.descriptions';

export const CurrentDateDescription: INodeProperties[] = [
	{
		displayName:
			'You can also refer to the current date in flowease expressions by using <code>{{$now}}</code> or <code>{{$today}}</code>. <a target="_blank" href="https://docs.flowease.khulnasoft.com/code-examples/expressions/luxon/">More info</a>',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				operation: ['getCurrentDate'],
			},
		},
	},
	{
		displayName: 'Include Current Time',
		name: 'includeTime',
		type: 'boolean',
		default: true,
		// eslint-disable-next-line flowease-nodes-base/node-param-description-boolean-without-whether
		description: 'When deactivated, the time will be set to midnight',
		displayOptions: {
			show: {
				operation: ['getCurrentDate'],
			},
		},
	},
	{
		displayName: 'Output Field Name',
		name: 'outputFieldName',
		type: 'string',
		default: 'currentDate',
		description: 'Name of the field to put the output in',
		displayOptions: {
			show: {
				operation: ['getCurrentDate'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				operation: ['getCurrentDate'],
			},
		},
		default: {},
		options: [
			includeInputFields,
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				placeholder: 'America/New_York',
				default: '',
				description:
					'The timezone to use. If not set, the timezone of the flowease instance will be used. Use ‘GMT’ for +00:00 timezone.',
			},
		],
	},
];
