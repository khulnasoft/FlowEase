<template>
	<span>
		<div v-if="!rootStore.pushConnectionActive" class="push-connection-lost primary-color">
			<flowease-tooltip placement="bottom-end">
				<template #content>
					<div v-html="$locale.baseText('pushConnectionTracker.cannotConnectToServer')"></div>
				</template>
				<span>
					<font-awesome-icon icon="exclamation-triangle" />&nbsp;
					{{ $locale.baseText('pushConnectionTracker.connectionLost') }}
				</span>
			</flowease-tooltip>
		</div>
		<slot v-else />
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useRootStore } from '@/stores/floweaseRoot.store';

export default defineComponent({
	name: 'PushConnectionTracker',
	computed: {
		...mapStores(useRootStore),
	},
});
</script>
