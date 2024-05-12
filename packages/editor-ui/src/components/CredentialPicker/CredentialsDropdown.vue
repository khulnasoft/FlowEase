<script setup lang="ts">
import type { PropType } from 'vue';
import { useI18n } from '@/composables/useI18n';

export type CredentialOption = {
	id: string;
	name: string;
	typeDisplayName: string | undefined;
};

const props = defineProps({
	credentialOptions: {
		type: Array as PropType<CredentialOption[]>,
		required: true,
	},
	selectedCredentialId: {
		type: String,
		required: false,
	},
});

const $emit = defineEmits({
	credentialSelected: (_credentialId: string) => true,
	newCredential: () => true,
});

const i18n = useI18n();

const NEW_CREDENTIALS_TEXT = `- ${i18n.baseText('nodeCredentials.createNew')} -`;

const onCredentialSelected = (credentialId: string) => {
	if (credentialId === NEW_CREDENTIALS_TEXT) {
		$emit('newCredential');
	} else {
		$emit('credentialSelected', credentialId);
	}
};
</script>

<template>
	<flowease-select
		size="small"
		:model-value="props.selectedCredentialId"
		@update:model-value="onCredentialSelected"
	>
		<flowease-option
			v-for="item in props.credentialOptions"
			:key="item.id"
			:data-test-id="`node-credentials-select-item-${item.id}`"
			:label="item.name"
			:value="item.id"
		>
			<div :class="[$style.credentialOption, 'mt-2xs mb-2xs']">
				<flowease-text bold>{{ item.name }}</flowease-text>
				<flowease-text size="small">{{ item.typeDisplayName }}</flowease-text>
			</div>
		</flowease-option>
		<flowease-option
			:key="NEW_CREDENTIALS_TEXT"
			data-test-id="node-credentials-select-item-new"
			:value="NEW_CREDENTIALS_TEXT"
			:label="NEW_CREDENTIALS_TEXT"
		>
		</flowease-option>
	</flowease-select>
</template>

<style lang="scss" module>
.credentialOption {
	display: flex;
	flex-direction: column;
}
</style>
