import type {
	INodeCredentials,
	INodeParameters,
	MessageEventBusDestinationOptions,
} from 'flowease-workflow';
import type { INodeUi } from '@/Interface';

export function destinationToFakeINodeUi(
	destination: MessageEventBusDestinationOptions,
	fakeType = 'flowease-nodes-base.stickyNote',
): INodeUi {
	return {
		id: destination.id,
		name: destination.id,
		typeVersion: 1,
		type: fakeType,
		position: [0, 0],
		credentials: {
			...(destination.credentials as INodeCredentials),
		},
		parameters: {
			...(destination as unknown as INodeParameters),
		},
	} as INodeUi;
}
