<script setup lang="ts">
// eslint-disable-next-line import/no-unresolved
import Close from 'virtual:icons/mdi/close';
import { computed, nextTick, onMounted } from 'vue';
import Layout from '@flowease/chat/components/Layout.vue';
import GetStarted from '@flowease/chat/components/GetStarted.vue';
import GetStartedFooter from '@flowease/chat/components/GetStartedFooter.vue';
import MessagesList from '@flowease/chat/components/MessagesList.vue';
import Input from '@flowease/chat/components/Input.vue';
import { useI18n, useChat, useOptions } from '@flowease/chat/composables';
import { chatEventBus } from '@flowease/chat/event-buses';

const { t } = useI18n();
const chatStore = useChat();

const { messages, currentSessionId } = chatStore;
const { options } = useOptions();

const showCloseButton = computed(() => options.mode === 'window' && options.showWindowCloseButton);

async function getStarted() {
	if (!chatStore.startNewSession) {
		return;
	}
	void chatStore.startNewSession();
	void nextTick(() => {
		chatEventBus.emit('scrollToBottom');
	});
}

async function initialize() {
	if (!chatStore.loadPreviousSession) {
		return;
	}
	await chatStore.loadPreviousSession();
	void nextTick(() => {
		chatEventBus.emit('scrollToBottom');
	});
}

function closeChat() {
	chatEventBus.emit('close');
}

onMounted(async () => {
	await initialize();
	if (!options.showWelcomeScreen && !currentSessionId.value) {
		await getStarted();
	}
});
</script>

<template>
	<Layout class="chat-wrapper">
		<template #header>
			<div class="chat-heading">
				<h1>
					{{ t('title') }}
				</h1>
				<button
					v-if="showCloseButton"
					class="chat-close-button"
					:title="t('closeButtonTooltip')"
					@click="closeChat"
				>
					<Close height="18" width="18" />
				</button>
			</div>
			<p v-if="t('subtitle')">{{ t('subtitle') }}</p>
		</template>
		<GetStarted v-if="!currentSessionId && options.showWelcomeScreen" @click:button="getStarted" />
		<MessagesList v-else :messages="messages" />
		<template #footer>
			<Input v-if="currentSessionId" />
			<GetStartedFooter v-else />
		</template>
	</Layout>
</template>

<style lang="scss">
.chat-heading {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.chat-close-button {
	display: flex;
	border: none;
	background: none;
	cursor: pointer;

	&:hover {
		color: var(--chat--close--button--color-hover, var(--chat--color-primary));
	}
}
</style>
