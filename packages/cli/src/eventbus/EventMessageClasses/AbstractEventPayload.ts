import type { IWorkflowBase, JsonValue } from 'flowease-workflow';

export interface AbstractEventPayload {
	[key: string]: JsonValue | IWorkflowBase | undefined;
}
