import type {
	IExecuteSingleFunctions,
	IFloweaseHttpFullResponse,
	INodeExecutionData,
	JsonObject,
} from 'flowease-workflow';
import { NodeApiError } from 'flowease-workflow';

export async function sendErrorPostReceive(
	this: IExecuteSingleFunctions,
	data: INodeExecutionData[],
	response: IFloweaseHttpFullResponse,
): Promise<INodeExecutionData[]> {
	if (String(response.statusCode).startsWith('4') || String(response.statusCode).startsWith('5')) {
		throw new NodeApiError(this.getNode(), response as unknown as JsonObject);
	}
	return data;
}
