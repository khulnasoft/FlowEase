import { ApplicationError } from 'flowease-workflow';

export class UnrecognizedNodeTypeError extends ApplicationError {
	severity = 'warning';

	constructor(nodeType: string) {
		super(`Unrecognized node type: ${nodeType}".`);
	}
}
