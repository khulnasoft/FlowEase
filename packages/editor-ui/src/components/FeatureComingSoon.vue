<template>
	<div v-if="featureInfo" :class="[$style.container]">
		<div v-if="showTitle" class="mb-2xl">
			<flowease-heading size="2xlarge">
				{{ $locale.baseText(featureInfo.featureName) }}
			</flowease-heading>
		</div>
		<div v-if="featureInfo.infoText" class="mb-l">
			<flowease-info-tip theme="info" type="note">
				<span v-html="$locale.baseText(featureInfo.infoText)"></span>
			</flowease-info-tip>
		</div>
		<div :class="$style.actionBoxContainer">
			<flowease-action-box
				:description="$locale.baseText(featureInfo.actionBoxDescription)"
				:button-text="
					$locale.baseText(featureInfo.actionBoxButtonLabel || 'fakeDoor.actionBox.button.label')
				"
				@click:button="openLinkPage"
			>
				<template #heading>
					<span v-html="$locale.baseText(featureInfo.actionBoxTitle)" />
				</template>
			</flowease-action-box>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import type { IFakeDoor } from '@/Interface';
import { useRootStore } from '@/stores/floweaseRoot.store';
import { useSettingsStore } from '@/stores/settings.store';
import { useUIStore } from '@/stores/ui.store';
import { useUsersStore } from '@/stores/users.store';

export default defineComponent({
	name: 'FeatureComingSoon',
	props: {
		featureId: {
			type: String,
			required: true,
		},
		showTitle: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		...mapStores(useRootStore, useSettingsStore, useUIStore, useUsersStore),
		userId(): string {
			return this.usersStore.currentUserId || '';
		},
		instanceId(): string {
			return this.rootStore.instanceId;
		},
		featureInfo(): IFakeDoor | undefined {
			return this.uiStore.getFakeDoorById(this.featureId);
		},
	},
	methods: {
		openLinkPage() {
			if (this.featureInfo) {
				window.open(
					`${this.featureInfo.linkURL}&u=${this.instanceId}#${this.userId}&v=${this.rootStore.versionCli}`,
					'_blank',
				);
				this.$telemetry.track('user clicked feature waiting list button', {
					feature: this.featureId,
				});
			}
		},
	},
});
</script>

<style lang="scss" module>
.actionBoxContainer {
	text-align: center;
}
</style>
