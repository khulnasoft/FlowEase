import { ApplicationError } from 'flowease-workflow';

export class ExternalSecretsProviderNotFoundError extends ApplicationError {
	constructor(public providerName: string) {
		super(`External secrets provider not found: ${providerName}`);
	}
}
