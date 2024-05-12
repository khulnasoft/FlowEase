import type { INodeProperties } from 'flowease-workflow';
import { includeInputFields } from './common.descriptions';

export const ExtractDateDescription: INodeProperties[] = [
	{
		displayName:
			'You can also do this using an expression, e.g. <code>{{ your_date.extract("month") }}}</code>. <a target="_blank" href="https://docs.flowease.khulnasoft.com/code-examples/expressions/luxon/">More info</a>',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				operation: ['extractDate'],
			},
		},
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'string',
		description: 'The date that you want to round',
		default: '',
		displayOptions: {
			show: {
				operation: ['extractDate'],
			},
		},
	},
	{
		displayName: 'Part',
		name: 'part',
		type: 'options',
		// eslint-disable-next-line flowease-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Year',
				value: 'year',
			},
			{
				name: 'Month',
				value: 'month',
			},
			{
				name: 'Week',
				value: 'week',
			},
			{
				name: 'Day',
				value: 'day',
			},
			{
				name: 'Hour',
				value: 'hour',
			},
			{
				name: 'Minute',
				value: 'minute',
			},
			{
				name: 'Second',
				value: 'second',
			},
		],
		default: 'month',
		displayOptions: {
			show: {
				operation: ['extractDate'],
			},
		},
	},
	{
		displayName: 'Output Field Name',
		name: 'outputFieldName',
		type: 'string',
		default: 'datePart',
		description: 'Name of the field to put the output in',
		displayOptions: {
			show: {
				operation: ['extractDate'],
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
				operation: ['extractDate'],
			},
		},
		default: {},
		options: [includeInputFields],
	},
];
