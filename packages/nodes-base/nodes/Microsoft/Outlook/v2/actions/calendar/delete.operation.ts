import type { IExecuteFunctions, INodeProperties } from 'flowease-workflow';
import { microsoftApiRequest } from '../../transport';
import { calendarRLC } from '../../descriptions';
import { updateDisplayOptions } from '@utils/utilities';

export const properties: INodeProperties[] = [calendarRLC];

const displayOptions = {
	show: {
		resource: ['calendar'],
		operation: ['delete'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const calendarId = this.getNodeParameter('calendarId', index, undefined, {
		extractValue: true,
	}) as string;

	await microsoftApiRequest.call(this, 'DELETE', `/calendars/${calendarId}`);

	const executionData = this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray({ success: true }),
		{ itemData: { item: index } },
	);

	return executionData;
}
