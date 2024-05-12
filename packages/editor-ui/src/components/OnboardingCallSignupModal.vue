<template>
	<Modal
		:name="ONBOARDING_CALL_SIGNUP_MODAL_KEY"
		:title="$locale.baseText('onboardingCallSignupModal.title')"
		:event-bus="modalBus"
		:center="true"
		:show-close="false"
		:before-close="onModalClose"
		width="460px"
	>
		<template #content>
			<div class="pb-m">
				<flowease-text>
					{{ $locale.baseText('onboardingCallSignupModal.description') }}
				</flowease-text>
			</div>
			<div @keyup.enter="onSignup">
				<flowease-input
					v-model="email"
					:placeholder="$locale.baseText('onboardingCallSignupModal.emailInput.placeholder')"
				/>
				<flowease-text v-if="showError" size="small" class="mt-4xs" tag="div" color="danger">
					{{ $locale.baseText('onboardingCallSignupModal.infoText.emailError') }}
				</flowease-text>
			</div>
		</template>
		<template #footer>
			<div :class="$style.buttonsContainer">
				<flowease-button
					:label="$locale.baseText('onboardingCallSignupModal.cancelButton.label')"
					:disabled="loading"
					float="right"
					type="outline"
					@click="onCancel"
				/>
				<flowease-button
					:disabled="email === '' || loading"
					:label="$locale.baseText('onboardingCallSignupModal.signupButton.label')"
					float="right"
					:loading="loading"
					@click="onSignup"
				/>
			</div>
		</template>
	</Modal>
</template>

<script lang="ts">
import { ONBOARDING_CALL_SIGNUP_MODAL_KEY, VALID_EMAIL_REGEX } from '@/constants';
import Modal from './Modal.vue';

import { defineComponent } from 'vue';
import { useToast } from '@/composables/useToast';
import { mapStores } from 'pinia';
import { useUIStore } from '@/stores/ui.store';
import { createEventBus } from 'flowease-design-system/utils';

export default defineComponent({
	name: 'OnboardingCallSignupModal',
	components: {
		Modal,
	},
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
			ONBOARDING_CALL_SIGNUP_MODAL_KEY,
			showError: false,
			okToClose: false,
			loading: false,
		};
	},
	computed: {
		...mapStores(useUIStore),
		isEmailValid(): boolean {
			return VALID_EMAIL_REGEX.test(String(this.email).toLowerCase());
		},
	},
	methods: {
		async onSignup() {
			if (!this.isEmailValid) {
				this.showError = true;
				return;
			}
			this.showError = false;
			this.loading = true;
			this.okToClose = false;

			try {
				await this.uiStore.applyForOnboardingCall(this.email);
				this.showMessage({
					type: 'success',
					title: this.$locale.baseText('onboardingCallSignupSucess.title'),
					message: this.$locale.baseText('onboardingCallSignupSucess.message'),
				});
				this.okToClose = true;
				this.modalBus.emit('close');
			} catch (e) {
				this.showError(
					e,
					this.$locale.baseText('onboardingCallSignupFailed.title'),
					this.$locale.baseText('onboardingCallSignupFailed.message'),
				);
				this.loading = false;
				this.okToClose = true;
			}
		},
		async onCancel() {
			this.okToClose = true;
			this.modalBus.emit('close');
		},
		onModalClose() {
			return this.okToClose;
		},
	},
});
</script>

<style lang="scss" module>
.buttonsContainer {
	display: flex;
	justify-content: flex-end;
	column-gap: var(--spacing-xs);
}
</style>
