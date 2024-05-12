import type { ICredentialDataDecryptedObject } from 'flowease-workflow';

export interface ExportableCredential {
	id: string;
	name: string;
	type: string;
	data: ICredentialDataDecryptedObject;

	/**
	 * Email of the user who owns this credential at the source instance.
	 * Ownership is mirrored at target instance if user is also present there.
	 */
	ownedBy: string | null;
}
