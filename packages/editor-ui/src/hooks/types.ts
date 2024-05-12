import type { ITelemetryTrackProperties } from 'flowease-workflow';

export interface TelemetryEventData {
	eventName: string;
	properties?: ITelemetryTrackProperties;
}
