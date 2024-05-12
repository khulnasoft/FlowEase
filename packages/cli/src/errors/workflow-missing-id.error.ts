import type { IWorkflowDb } from '@/Interfaces';
import type { Workflow } from 'flowease-workflow';
import { ApplicationError } from 'flowease-workflow';

export class WorkflowMissingIdError extends ApplicationError {
	constructor(workflow: Workflow | IWorkflowDb) {
		super('Detected ID-less worklfow', { extra: { workflow } });
	}
}
