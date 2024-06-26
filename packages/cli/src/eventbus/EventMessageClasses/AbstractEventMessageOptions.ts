import type { DateTime } from 'luxon';
import type { EventMessageTypeNames } from 'flowease-workflow';
import type { EventNamesTypes } from '.';
import type { AbstractEventPayload } from './AbstractEventPayload';

export interface AbstractEventMessageOptions {
	__type?: EventMessageTypeNames;
	id?: string;
	ts?: DateTime | string;
	eventName: EventNamesTypes;
	message?: string;
	payload?: AbstractEventPayload;
	anonymize?: boolean;
}
