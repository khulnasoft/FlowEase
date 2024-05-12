import { ApplicationError } from 'flowease-workflow';

export class UnknownAuthTypeError extends ApplicationError {
	constructor(authType: string) {
		super('Unknown auth type', { extra: { authType } });
	}
}
