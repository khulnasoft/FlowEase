import type { IOnboardingCallPrompt, IUser } from '@/Interface';
import { get, post } from '@/utils/apiUtils';
import { isUserGlobalOwner } from '@/utils/userUtils';

const FLOWEASE_API_BASE_URL = 'https://api.flowease.khulnasoft.com/api';
const ONBOARDING_PROMPTS_ENDPOINT = '/prompts/onboarding';
const CONTACT_EMAIL_SUBMISSION_ENDPOINT = '/accounts/onboarding';

export async function fetchNextOnboardingPrompt(
	instanceId: string,
	currentUser: IUser,
): Promise<IOnboardingCallPrompt> {
	return await get(FLOWEASE_API_BASE_URL, ONBOARDING_PROMPTS_ENDPOINT, {
		instance_id: instanceId,
		user_id: `${instanceId}#${currentUser.id}`,
		is_owner: isUserGlobalOwner(currentUser),
		survey_results: currentUser.personalizationAnswers,
	});
}

export async function applyForOnboardingCall(
	instanceId: string,
	currentUser: IUser,
	email: string,
): Promise<string> {
	try {
		const response = await post(FLOWEASE_API_BASE_URL, ONBOARDING_PROMPTS_ENDPOINT, {
			instance_id: instanceId,
			user_id: `${instanceId}#${currentUser.id}`,
			email,
		});
		return response;
	} catch (e) {
		throw e;
	}
}

export async function submitEmailOnSignup(
	instanceId: string,
	currentUser: IUser,
	email: string | undefined,
	agree: boolean,
): Promise<string> {
	return await post(FLOWEASE_API_BASE_URL, CONTACT_EMAIL_SUBMISSION_ENDPOINT, {
		instance_id: instanceId,
		user_id: `${instanceId}#${currentUser.id}`,
		email,
		agree,
		agree_updates: true,
	});
}
