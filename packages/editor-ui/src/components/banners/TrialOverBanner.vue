<script lang="ts" setup>
import BaseBanner from '@/components/banners/BaseBanner.vue';
import { i18n as locale } from '@/plugins/i18n';
import { useUIStore } from '@/stores/ui.store';

function onUpdatePlanClick() {
	void useUIStore().goToUpgrade('canvas-nav', 'upgrade-canvas-nav', 'redirect');
}
</script>

<template>
	<BaseBanner custom-icon="info-circle" theme="warning" name="TRIAL_OVER">
		<template #mainContent>
			<span>{{ locale.baseText('banners.trialOver.message') }}</span>
		</template>
		<template #trailingContent>
			<flowease-button type="success" icon="gem" size="small" @click="onUpdatePlanClick">{{
				locale.baseText('generic.upgradeNow')
			}}</flowease-button>
		</template>
	</BaseBanner>
</template>
