import type { ICredentialType, INodeProperties } from 'flowease-workflow';

export class AutomizyApi implements ICredentialType {
	name = 'automizyApi';

	displayName = 'Automizy API';

	documentationUrl = 'automizy';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
