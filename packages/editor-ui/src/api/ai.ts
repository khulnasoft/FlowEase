import type { IRestApiContext, Schema } from '@/Interface';
import { makeRestApiRequest } from '@/utils/apiUtils';
import type { IDataObject } from 'flowease-workflow';

export interface GenerateCurlPayload {
	service: string;
	request: string;
}

export interface GenerateCurlResponse {
	curl: string;
	metadata: object;
}

export async function generateCodeForPrompt(
	ctx: IRestApiContext,
	{
		question,
		context,
		model,
		floweaseVersion,
	}: {
		question: string;
		context: {
			schema: Array<{ nodeName: string; schema: Schema }>;
			inputSchema: { nodeName: string; schema: Schema };
			pushRef: string;
			ndvPushRef: string;
		};
		model: string;
		floweaseVersion: string;
	},
): Promise<{ code: string }> {
	return await makeRestApiRequest(ctx, 'POST', '/ask-ai', {
		question,
		context,
		model,
		floweaseVersion,
	} as IDataObject);
}

export const generateCurl = async (
	context: IRestApiContext,
	payload: GenerateCurlPayload,
): Promise<GenerateCurlResponse> => {
	return await makeRestApiRequest(
		context,
		'POST',
		'/ai/generate-curl',
		payload as unknown as IDataObject,
	);
};
