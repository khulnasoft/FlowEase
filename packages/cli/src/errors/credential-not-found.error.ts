import { ApplicationError } from 'flowease-workflow';

export class CredentialNotFoundError extends ApplicationError {
	constructor(credentialId: string, credentialType: string) {
		super(`Credential with ID "${credentialId}" does not exist for type "${credentialType}".`);
		this.level = 'warning';
	}
}
