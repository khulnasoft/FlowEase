import { AbstractEventMessage, isEventMessageOptionsWithType } from './AbstractEventMessage';
import type { JsonObject } from 'flowease-workflow';
import { EventMessageTypeNames } from 'flowease-workflow';
import type { AbstractEventMessageOptions } from './AbstractEventMessageOptions';
import type { AbstractEventPayload } from './AbstractEventPayload';
import type { EventNamesNodeType } from '.';

// --------------------------------------
// EventMessage class for Node events
// --------------------------------------
export interface EventPayloadNode extends AbstractEventPayload {
	msg?: string;
	executionId: string;
	nodeName: string;
	workflowId?: string;
	workflowName: string;
	nodeType?: string;
}

export interface EventMessageNodeOptions extends AbstractEventMessageOptions {
	eventName: EventNamesNodeType;

	payload?: EventPayloadNode | undefined;
}

export class EventMessageNode extends AbstractEventMessage {
	readonly __type = EventMessageTypeNames.node;

	eventName: EventNamesNodeType;

	payload: EventPayloadNode;

	constructor(options: EventMessageNodeOptions) {
		super(options);
		if (options.payload) this.setPayload(options.payload);
		if (options.anonymize) {
			this.anonymize();
		}
	}

	setPayload(payload: EventPayloadNode): this {
		this.payload = payload;
		return this;
	}

	deserialize(data: JsonObject): this {
		if (isEventMessageOptionsWithType(data, this.__type)) {
			this.setOptionsOrDefault(data);
			if (data.payload) this.setPayload(data.payload as EventPayloadNode);
		}
		return this;
	}
}
