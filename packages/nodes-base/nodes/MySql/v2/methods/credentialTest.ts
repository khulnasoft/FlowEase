import type {
	ICredentialDataDecryptedObject,
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	INodeCredentialTestResult,
} from 'flowease-workflow';

import { Client } from 'ssh2';
import { createPool } from '../transport';

export async function mysqlConnectionTest(
	this: ICredentialTestFunctions,
	credential: ICredentialsDecrypted,
): Promise<INodeCredentialTestResult> {
	const credentials = credential.data as ICredentialDataDecryptedObject;

	let sshClient: Client | undefined = undefined;

	if (credentials.sshTunnel) {
		sshClient = new Client();
	}
	const pool = await createPool(credentials, {}, sshClient);

	try {
		const connection = await pool.getConnection();
		connection.release();
	} catch (error) {
		return {
			status: 'Error',
			message: error.message,
		};
	} finally {
		if (sshClient) {
			sshClient.end();
		}
		await pool.end();
	}

	return {
		status: 'OK',
		message: 'Connection successful!',
	};
}
