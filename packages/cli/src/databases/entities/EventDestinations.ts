import { MessageEventBusDestinationOptions } from 'flowease-workflow';
import { Column, Entity, PrimaryColumn } from '@flowease/typeorm';
import { WithTimestamps, jsonColumnType } from './AbstractEntity';

@Entity({ name: 'event_destinations' })
export class EventDestinations extends WithTimestamps {
	@PrimaryColumn('uuid')
	id: string;

	@Column(jsonColumnType)
	destination: MessageEventBusDestinationOptions;
}
