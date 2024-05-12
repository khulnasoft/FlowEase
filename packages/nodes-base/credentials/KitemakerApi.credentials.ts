import type { ICredentialType, INodeProperties } from 'flowease-workflow';

export class KitemakerApi implements ICredentialType {
	name = 'kitemakerApi';

	displayName = 'Kitemaker API';

	documentationUrl = 'kitemaker';

	properties: INodeProperties[] = [
		{
			displayName: 'Personal Access Token',
			name: 'personalAccessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
