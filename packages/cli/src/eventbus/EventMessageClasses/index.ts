import type { EventMessageAiNode } from './EventMessageAiNode';
import type { EventMessageAudit } from './EventMessageAudit';
import type { EventMessageGeneric } from './EventMessageGeneric';
import type { EventMessageNode } from './EventMessageNode';
import type { EventMessageWorkflow } from './EventMessageWorkflow';
import { eventNamesAiNodes, type EventNamesAiNodesType } from 'flowease-workflow';

export const eventNamesWorkflow = [
	'flowease.workflow.started',
	'flowease.workflow.success',
	'flowease.workflow.failed',
	'flowease.workflow.crashed',
] as const;
export const eventNamesGeneric = ['flowease.worker.started', 'flowease.worker.stopped'] as const;
export const eventNamesNode = ['flowease.node.started', 'flowease.node.finished'] as const;
export const eventNamesAudit = [
	'flowease.audit.user.login.success',
	'flowease.audit.user.login.failed',
	'flowease.audit.user.signedup',
	'flowease.audit.user.updated',
	'flowease.audit.user.deleted',
	'flowease.audit.user.invited',
	'flowease.audit.user.invitation.accepted',
	'flowease.audit.user.reinvited',
	'flowease.audit.user.email.failed',
	'flowease.audit.user.reset.requested',
	'flowease.audit.user.reset',
	'flowease.audit.user.credentials.created',
	'flowease.audit.user.credentials.shared',
	'flowease.audit.user.credentials.updated',
	'flowease.audit.user.credentials.deleted',
	'flowease.audit.user.api.created',
	'flowease.audit.user.api.deleted',
	'flowease.audit.package.installed',
	'flowease.audit.package.updated',
	'flowease.audit.package.deleted',
	'flowease.audit.workflow.created',
	'flowease.audit.workflow.deleted',
	'flowease.audit.workflow.updated',
] as const;

export type EventNamesWorkflowType = (typeof eventNamesWorkflow)[number];
export type EventNamesAuditType = (typeof eventNamesAudit)[number];
export type EventNamesNodeType = (typeof eventNamesNode)[number];
export type EventNamesGenericType = (typeof eventNamesGeneric)[number];

export type EventNamesTypes =
	| EventNamesAuditType
	| EventNamesWorkflowType
	| EventNamesNodeType
	| EventNamesGenericType
	| EventNamesAiNodesType
	| 'flowease.destination.test';

export const eventNamesAll = [
	...eventNamesAudit,
	...eventNamesWorkflow,
	...eventNamesNode,
	...eventNamesGeneric,
	...eventNamesAiNodes,
];

export type EventMessageTypes =
	| EventMessageGeneric
	| EventMessageWorkflow
	| EventMessageAudit
	| EventMessageNode
	| EventMessageAiNode;

export interface FailedEventSummary {
	lastNodeExecuted: string;
	executionId: string;
	name: string;
	event: string;
	timestamp: string;
}
