import type { BaseMessageChunk, BaseMessageLike } from '@langchain/core/messages';
import type { BaseChatModelCallOptions } from '@langchain/core/language_models/chat_models';

export interface FloweaseAIProvider {
	invoke(message: BaseMessageLike[], options?: BaseChatModelCallOptions): Promise<string>;
	mapResponse(data: BaseMessageChunk): string;
}
