import { inject } from 'vue';
import { ChatSymbol } from '@flowease/chat/constants';
import type { Chat } from '@flowease/chat/types';

export function useChat() {
	return inject(ChatSymbol) as Chat;
}
