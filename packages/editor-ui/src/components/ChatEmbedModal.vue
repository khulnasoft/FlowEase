<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed, ref } from 'vue';
import type { EventBus } from 'flowease-design-system/utils';
import { createEventBus } from 'flowease-design-system/utils';
import Modal from './Modal.vue';
import { CHAT_EMBED_MODAL_KEY, CHAT_TRIGGER_NODE_TYPE, WEBHOOK_NODE_TYPE } from '../constants';
import { useRootStore } from '@/stores/floweaseRoot.store';
import { useWorkflowsStore } from '@/stores/workflows.store';
import HtmlEditor from '@/components/HtmlEditor/HtmlEditor.vue';
import JsEditor from '@/components/JsEditor/JsEditor.vue';
import { useI18n } from '@/composables/useI18n';

const props = defineProps({
	modalBus: {
		type: Object as PropType<EventBus>,
		default: () => createEventBus(),
	},
});

const i18n = useI18n();
const rootStore = useRootStore();
const workflowsStore = useWorkflowsStore();

const tabs = ref([
	{
		label: 'CDN Embed',
		value: 'cdn',
	},
	{
		label: 'Vue Embed',
		value: 'vue',
	},
	{
		label: 'React Embed',
		value: 'react',
	},
	{
		label: 'Other',
		value: 'other',
	},
]);
const currentTab = ref('cdn');

const webhookNode = computed(() => {
	for (const type of [CHAT_TRIGGER_NODE_TYPE, WEBHOOK_NODE_TYPE]) {
		const node = workflowsStore.workflow.nodes.find((node) => node.type === type);
		if (node) {
			// This has to be kept up-to-date with the mode in the Chat-Trigger node
			if (type === CHAT_TRIGGER_NODE_TYPE && !node.parameters.public) {
				continue;
			}

			return {
				type,
				node,
			};
		}
	}

	return null;
});

const webhookUrl = computed(() => {
	const url = `${rootStore.getWebhookUrl}${
		webhookNode.value ? `/${webhookNode.value.node.webhookId}` : ''
	}`;

	return webhookNode.value?.type === CHAT_TRIGGER_NODE_TYPE ? `${url}/chat` : url;
});

function indentLines(code: string, indent: string = '	') {
	return code
		.split('\n')
		.map((line) => `${indent}${line}`)
		.join('\n');
}

const importCode = 'import'; // To avoid vite from parsing the import statement
const commonCode = computed(() => ({
	import: `${importCode} '@flowease/chat/style.css';
${importCode} { createChat } from '@flowease/chat';`,
	createChat: `createChat({
	webhookUrl: '${webhookUrl.value}'
});`,
	install: 'npm install @flowease/chat',
}));

const cdnCode = computed(
	() => `<link href="https://cdn.jsdelivr.net/npm/@flowease/chat/style.css" rel="stylesheet" />
<script type="module">
${importCode} { createChat } from 'https://cdn.jsdelivr.net/npm/@flowease/chat/chat.bundle.es.js';

${commonCode.value.createChat}
</${'script'}>`,
);

const vueCode = computed(
	() => `<script lang="ts" setup>
${importCode} { onMounted } from 'vue';
${commonCode.value.import}

onMounted(() => {
${indentLines(commonCode.value.createChat)}
});
</${'script'}>`,
);

const reactCode = computed(
	() => `${importCode} { useEffect } from 'react';
${commonCode.value.import}

export const App = () => {
	useEffect(() => {
${indentLines(commonCode.value.createChat, '		')}
	}, []);

	return (<div></div>);
};

</${'script'}>`,
);

const otherCode = computed(
	() => `${commonCode.value.import}

${commonCode.value.createChat}`,
);

function closeDialog() {
	props.modalBus.emit('close');
}
</script>

<template>
	<Modal
		max-width="960px"
		:title="i18n.baseText('chatEmbed.title')"
		:event-bus="modalBus"
		:name="CHAT_EMBED_MODAL_KEY"
		:center="true"
	>
		<template #content>
			<div :class="$style.container">
				<flowease-tabs v-model="currentTab" :options="tabs" />

				<div v-if="currentTab !== 'cdn'">
					<div class="mb-s">
						<flowease-text>
							{{ i18n.baseText('chatEmbed.install') }}
						</flowease-text>
					</div>
					<HtmlEditor :model-value="commonCode.install" is-read-only />
				</div>

				<div class="mb-s">
					<flowease-text>
						<i18n-t :keypath="`chatEmbed.paste.${currentTab}`">
							<template #code>
								<code>{{ i18n.baseText(`chatEmbed.paste.${currentTab}.file`) }}</code>
							</template>
						</i18n-t>
					</flowease-text>
				</div>

				<HtmlEditor v-if="currentTab === 'cdn'" :model-value="cdnCode" is-read-only />
				<HtmlEditor v-if="currentTab === 'vue'" :model-value="vueCode" is-read-only />
				<JsEditor v-if="currentTab === 'react'" :model-value="reactCode" is-read-only />
				<JsEditor v-if="currentTab === 'other'" :model-value="otherCode" is-read-only />

				<flowease-text>
					{{ i18n.baseText('chatEmbed.packageInfo.description') }}
					<flowease-link :href="i18n.baseText('chatEmbed.url')" new-window bold>
						{{ i18n.baseText('chatEmbed.packageInfo.link') }}
					</flowease-link>
				</flowease-text>

				<flowease-info-tip class="mt-s">
					{{ i18n.baseText('chatEmbed.chatTriggerNode') }}
				</flowease-info-tip>
			</div>
		</template>

		<template #footer>
			<div class="action-buttons">
				<flowease-button
					float="right"
					:label="i18n.baseText('chatEmbed.close')"
					@click="closeDialog"
				/>
			</div>
		</template>
	</Modal>
</template>

<style module lang="scss">
.container > * {
	margin-bottom: var(--spacing-s);
	overflow-wrap: break-word;
}
</style>
