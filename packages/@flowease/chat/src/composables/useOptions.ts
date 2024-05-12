import { inject } from 'vue';
import { ChatOptionsSymbol } from '@flowease/chat/constants';
import type { ChatOptions } from '@flowease/chat/types';

export function useOptions() {
	const options = inject(ChatOptionsSymbol) as ChatOptions;

	return {
		options,
	};
}
