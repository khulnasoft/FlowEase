<template>
	<Modal
		max-width="540px"
		:title="$locale.baseText('about.aboutFlowease')"
		:event-bus="modalBus"
		:name="ABOUT_MODAL_KEY"
		:center="true"
	>
		<template #content>
			<div :class="$style.container">
				<el-row>
					<el-col :span="8" class="info-name">
						<flowease-text>{{ $locale.baseText('about.floweaseVersion') }}</flowease-text>
					</el-col>
					<el-col :span="16">
						<flowease-text>{{ rootStore.versionCli }}</flowease-text>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" class="info-name">
						<flowease-text>{{ $locale.baseText('about.sourceCode') }}</flowease-text>
					</el-col>
					<el-col :span="16">
						<flowease-link to="https://github.com/khulnasoft/flowease">https://github.com/khulnasoft/flowease</flowease-link>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" class="info-name">
						<flowease-text>{{ $locale.baseText('about.license') }}</flowease-text>
					</el-col>
					<el-col :span="16">
						<flowease-link to="https://github.com/khulnasoft/flowease/blob/master/packages/cli/LICENSE.md">
							{{ $locale.baseText('about.floweaseLicense') }}
						</flowease-link>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8" class="info-name">
						<flowease-text>{{ $locale.baseText('about.instanceID') }}</flowease-text>
					</el-col>
					<el-col :span="16">
						<flowease-text>{{ rootStore.instanceId }}</flowease-text>
					</el-col>
				</el-row>
			</div>
		</template>

		<template #footer>
			<div class="action-buttons">
				<flowease-button
					float="right"
					:label="$locale.baseText('about.close')"
					data-test-id="close-about-modal-button"
					@click="closeDialog"
				/>
			</div>
		</template>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { createEventBus } from 'flowease-design-system/utils';
import Modal from './Modal.vue';
import { ABOUT_MODAL_KEY } from '../constants';
import { useSettingsStore } from '@/stores/settings.store';
import { useRootStore } from '@/stores/floweaseRoot.store';

export default defineComponent({
	name: 'About',
	components: {
		Modal,
	},
	data() {
		return {
			ABOUT_MODAL_KEY,
			modalBus: createEventBus(),
		};
	},
	computed: {
		...mapStores(useRootStore, useSettingsStore),
	},
	methods: {
		closeDialog() {
			this.modalBus.emit('close');
		},
	},
});
</script>

<style module lang="scss">
.container > * {
	margin-bottom: var(--spacing-s);
	overflow-wrap: break-word;
}
</style>
