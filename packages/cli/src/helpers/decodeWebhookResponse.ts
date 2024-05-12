import {
	BINARY_ENCODING,
	type IDataObject,
	type IExecuteResponsePromiseData,
} from 'flowease-workflow';

export function decodeWebhookResponse(
	response: IExecuteResponsePromiseData,
): IExecuteResponsePromiseData {
	if (
		typeof response === 'object' &&
		typeof response.body === 'object' &&
		(response.body as IDataObject)['__@FloweaseEncodedBuffer@__']
	) {
		response.body = Buffer.from(
			(response.body as IDataObject)['__@FloweaseEncodedBuffer@__'] as string,
			BINARY_ENCODING,
		);
	}

	return response;
}
