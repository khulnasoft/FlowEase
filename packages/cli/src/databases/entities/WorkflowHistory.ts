import { Column, Entity, ManyToOne, PrimaryColumn } from '@flowease/typeorm';
import { WithTimestamps, jsonColumnType } from './AbstractEntity';
import { IConnections } from 'flowease-workflow';
import type { INode } from 'flowease-workflow';
import { WorkflowEntity } from './WorkflowEntity';

@Entity()
export class WorkflowHistory extends WithTimestamps {
	@PrimaryColumn()
	versionId: string;

	@Column()
	workflowId: string;

	@Column(jsonColumnType)
	nodes: INode[];

	@Column(jsonColumnType)
	connections: IConnections;

	@Column()
	authors: string;

	@ManyToOne('WorkflowEntity', {
		onDelete: 'CASCADE',
	})
	workflow: WorkflowEntity;
}
