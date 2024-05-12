import type {
	IRestApiContext,
	IFloweasePrompts,
	IFloweaseValueSurveyData,
	IFloweasePromptResponse,
} from '../Interface';
import { makeRestApiRequest, get, post } from '@/utils/apiUtils';
import { FLOWEASE_IO_BASE_URL, NPM_COMMUNITY_NODE_SEARCH_API_URL } from '@/constants';
import type { IFloweaseUISettings } from 'flowease-workflow';

export async function getSettings(context: IRestApiContext): Promise<IFloweaseUISettings> {
	return await makeRestApiRequest(context, 'GET', '/settings');
}

export async function getPromptsData(
	instanceId: string,
	userId: string,
): Promise<IFloweasePrompts> {
	return await get(
		FLOWEASE_IO_BASE_URL,
		'/prompts',
		{},
		{ 'flowease-instance-id': instanceId, 'flowease-user-id': userId },
	);
}

export async function submitContactInfo(
	instanceId: string,
	userId: string,
	email: string,
): Promise<IFloweasePromptResponse> {
	return await post(
		FLOWEASE_IO_BASE_URL,
		'/prompt',
		{ email },
		{ 'flowease-instance-id': instanceId, 'flowease-user-id': userId },
	);
}

export async function submitValueSurvey(
	instanceId: string,
	userId: string,
	params: IFloweaseValueSurveyData,
): Promise<IFloweasePromptResponse> {
	return await post(FLOWEASE_IO_BASE_URL, '/value-survey', params, {
		'flowease-instance-id': instanceId,
		'flowease-user-id': userId,
	});
}

export async function getAvailableCommunityPackageCount(): Promise<number> {
	const response = await get(
		NPM_COMMUNITY_NODE_SEARCH_API_URL,
		'search?q=keywords:flowease-community-node-package',
	);

	return response.total || 0;
}
