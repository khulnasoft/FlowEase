import type { ICredentialType, INodeProperties } from 'flowease-workflow';

export class ZammadBasicAuthApi implements ICredentialType {
	name = 'zammadBasicAuthApi';

	displayName = 'Zammad Basic Auth API';

	documentationUrl = 'zammad';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://flowease-helpdesk.zammad.com',
			required: true,
		},
		{
			displayName: 'Email',
			name: 'username',
			type: 'string',
			default: '',
			placeholder: 'helpdesk@flowease.khulnasoft.com',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Ignore SSL Issues',
			name: 'allowUnauthorizedCerts',
			type: 'boolean',
			description: 'Whether to connect even if SSL certificate validation is not possible',
			default: false,
		},
	];
}
