<template>
	<Modal
		:name="modalName"
		:event-bus="modalBus"
		:center="true"
		:close-on-press-escape="false"
		:before-close="closeDialog"
		custom-class="contact-prompt-modal"
		width="460px"
	>
		<template #header>
			<flowease-heading tag="h2" size="xlarge" color="text-dark">{{ title }}</flowease-heading>
		</template>
		<template #content>
			<div :class="$style.description">
				<flowease-text size="medium" color="text-base">{{ description }}</flowease-text>
			</div>
			<div @keyup.enter="send">
				<flowease-input v-model="email" placeholder="Your email address" />
			</div>
			<div :class="$style.disclaimer">
				<flowease-text size="small" color="text-base"
					>David from our product team will get in touch personally</flowease-text
				>
			</div>
		</template>
		<template #footer>
			<div :class="$style.footer">
				<flowease-button label="Send" float="right" :disabled="!isEmailValid" @click="send" />
			</div>
		</template>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import type { IFloweasePromptResponse } from '@/Interface';
import { VALID_EMAIL_REGEX } from '@/constants';
import Modal from '@/components/Modal.vue';
import { useSettingsStore } from '@/stores/settings.store';
import { useRootStore } from '@/stores/floweaseRoot.store';
import { createEventBus } from 'flowease-design-system/utils';
import { useToast } from '@/composables/useToast';

export default defineComponent({
	name: 'ContactPromptModal',
	components: { Modal },
	props: ['modalName'],
	setup() {
		return {
			...useToast(),
		};
	},
	data() {
		return {
			email: '',
			modalBus: createEventBus(),
		};
	},
	computed: {
		...mapStores(useRootStore, useSettingsStore),
		title(): string {
			if (this.settingsStore.promptsData && this.settingsStore.promptsData.title) {
				return this.settingsStore.promptsData.title;
			}

			return 'You’re a power user 💪';
		},
		description(): string {
			if (this.settingsStore.promptsData && this.settingsStore.promptsData.message) {
				return this.settingsStore.promptsData.message;
			}

			return 'Your experience with flowease can help us improve — for you and our entire community.';
		},
		isEmailValid(): boolean {
			return VALID_EMAIL_REGEX.test(String(this.email).toLowerCase());
		},
	},
	methods: {
		closeDialog(): void {
			if (!this.isEmailValid) {
				this.$telemetry.track('User closed email modal', {
					instance_id: this.rootStore.instanceId,
					email: null,
				});
			}
		},
		async send() {
			if (this.isEmailValid) {
				const response = (await this.settingsStore.submitContactInfo(
					this.email,
				)) as IFloweasePromptResponse;

				if (response.updated) {
					this.$telemetry.track('User closed email modal', {
						instance_id: this.rootStore.instanceId,
						email: this.email,
					});
					this.showMessage({
						title: 'Thanks!',
						message: "It's people like you that help make flowease better",
						type: 'success',
					});
				}
				this.modalBus.emit('close');
			}
		},
	},
});
</script>

<style lang="scss" module>
.description {
	margin-bottom: var(--spacing-s);
}

.disclaimer {
	margin-top: var(--spacing-4xs);
}
</style>

<style lang="scss">
.dialog-wrapper {
	.contact-prompt-modal {
		.el-dialog__body {
			padding: 16px 24px 24px;
		}
	}
}
</style>
