import type { Document } from '@langchain/core/documents';
import type { INodeExecutionData } from 'flowease-workflow';
import { FloweaseJsonLoader } from '../../../utils/FloweaseJsonLoader';
import { FloweaseBinaryLoader } from '../../../utils/FloweaseBinaryLoader';

export async function processDocuments(
	documentInput:
		| FloweaseJsonLoader
		| FloweaseBinaryLoader
		| Array<Document<Record<string, unknown>>>,
	inputItems: INodeExecutionData[],
) {
	let processedDocuments: Document[];

	if (
		documentInput instanceof FloweaseJsonLoader ||
		documentInput instanceof FloweaseBinaryLoader
	) {
		processedDocuments = await documentInput.processAll(inputItems);
	} else {
		processedDocuments = documentInput;
	}

	const serializedDocuments = processedDocuments.map(({ metadata, pageContent }) => ({
		json: { metadata, pageContent },
	}));

	return {
		processedDocuments,
		serializedDocuments,
	};
}
export async function processDocument(
	documentInput:
		| FloweaseJsonLoader
		| FloweaseBinaryLoader
		| Array<Document<Record<string, unknown>>>,
	inputItem: INodeExecutionData,
	itemIndex: number,
) {
	let processedDocuments: Document[];

	if (
		documentInput instanceof FloweaseJsonLoader ||
		documentInput instanceof FloweaseBinaryLoader
	) {
		processedDocuments = await documentInput.processItem(inputItem, itemIndex);
	} else {
		processedDocuments = documentInput;
	}

	const serializedDocuments = processedDocuments.map(({ metadata, pageContent }) => ({
		json: { metadata, pageContent },
		pairedItem: {
			item: itemIndex,
		},
	}));

	return {
		processedDocuments,
		serializedDocuments,
	};
}
