<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import hljs from 'highlight.js/lib/core';
import hljsXML from 'highlight.js/lib/languages/xml';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import { Chat, ChatWindow } from '@flowease/chat/components';
import { useOptions } from '@flowease/chat/composables';

defineProps({});

const { options } = useOptions();

const isFullscreen = computed<boolean>(() => options.mode === 'fullscreen');

onMounted(() => {
	hljs.registerLanguage('xml', hljsXML);
	hljs.registerLanguage('javascript', hljsJavascript);
});
</script>
<template>
	<Chat v-if="isFullscreen" class="flowease-chat" />
	<ChatWindow v-else class="flowease-chat" />
</template>
