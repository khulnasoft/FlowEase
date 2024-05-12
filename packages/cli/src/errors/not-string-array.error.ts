import { ApplicationError } from 'flowease-workflow';

export class NotStringArrayError extends ApplicationError {
	constructor(env: string) {
		super(`${env} is not a string array.`);
	}
}
