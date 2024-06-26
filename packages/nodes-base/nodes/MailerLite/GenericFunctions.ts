import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	JsonObject,
	IRequestOptions,
	IHttpRequestMethods,
} from 'flowease-workflow';
import { NodeApiError } from 'flowease-workflow';

export async function mailerliteApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	path: string,

	body: any = {},
	qs: IDataObject = {},
	_option = {},
): Promise<any> {
	const credentials = await this.getCredentials('mailerLiteApi');

	const options: IRequestOptions = {
		headers: {
			'X-MailerLite-ApiKey': credentials.apiKey,
		},
		method,
		body,
		qs,
		uri: `https://api.mailerlite.com/api/v2${path}`,
		json: true,
	};
	try {
		if (Object.keys(body as IDataObject).length === 0) {
			delete options.body;
		}
		//@ts-ignore
		return await this.helpers.request.call(this, options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function mailerliteApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,

	body: any = {},
	query: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];

	let responseData;

	query.limit = 1000;
	query.offset = 0;

	do {
		responseData = await mailerliteApiRequest.call(this, method, endpoint, body, query);
		returnData.push.apply(returnData, responseData as IDataObject[]);
		query.offset = query.offset + query.limit;
	} while (responseData.length !== 0);
	return returnData;
}
