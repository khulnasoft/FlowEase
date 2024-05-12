import type { INodeProperties } from 'flowease-workflow';

export const sessionIdOption: INodeProperties = {
	displayName: 'Session ID',
	name: 'sessionIdType',
	type: 'options',
	options: [
		{
			// eslint-disable-next-line flowease-nodes-base/node-param-display-name-miscased
			name: 'Take from previous node automatically',
			value: 'fromInput',
			description: 'Looks for an input field called sessionId',
		},
		{
			// eslint-disable-next-line flowease-nodes-base/node-param-display-name-miscased
			name: 'Define below',
			value: 'customKey',
			description: 'Use an expression to reference data in previous nodes or enter static text',
		},
	],
	default: 'fromInput',
};

export const sessionKeyProperty: INodeProperties = {
	displayName: 'Key',
	name: 'sessionKey',
	type: 'string',
	default: '',
	description: 'The key to use to store session ID in the memory',
	displayOptions: {
		show: {
			sessionIdType: ['customKey'],
		},
	},
};
