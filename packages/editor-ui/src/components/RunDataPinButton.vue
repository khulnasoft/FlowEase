<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '@/composables/useI18n';
import type { usePinnedData } from '@/composables/usePinnedData';

const locale = useI18n();

type Props = {
	tooltipContentsVisibility: {
		binaryDataTooltipContent: boolean;
		pinDataDiscoveryTooltipContent: boolean;
	};
	dataPinningDocsUrl: string;
	pinnedData: ReturnType<typeof usePinnedData>;
	disabled: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits<{
	(event: 'togglePinData'): void;
}>();

const visible = computed(() =>
	props.tooltipContentsVisibility.pinDataDiscoveryTooltipContent ? true : undefined,
);
</script>

<template>
	<flowease-tooltip placement="bottom-end" :visible="visible">
		<template #content>
			<div v-if="props.tooltipContentsVisibility.binaryDataTooltipContent">
				{{ locale.baseText('ndv.pinData.pin.binary') }}
			</div>
			<div v-else-if="props.tooltipContentsVisibility.pinDataDiscoveryTooltipContent">
				{{ locale.baseText('node.discovery.pinData.ndv') }}
			</div>
			<div v-else>
				<strong>{{ locale.baseText('ndv.pinData.pin.title') }}</strong>
				<flowease-text size="small" tag="p">
					{{ locale.baseText('ndv.pinData.pin.description') }}

					<flowease-link :to="props.dataPinningDocsUrl" size="small">
						{{ locale.baseText('ndv.pinData.pin.link') }}
					</flowease-link>
				</flowease-text>
			</div>
		</template>
		<flowease-icon-button
			:class="$style.pinDataButton"
			type="tertiary"
			:active="props.pinnedData.hasData.value"
			icon="thumbtack"
			:disabled="props.disabled"
			data-test-id="ndv-pin-data"
			@click="emit('togglePinData')"
		/>
	</flowease-tooltip>
</template>

<style lang="scss" module>
.pinDataButton {
	margin-left: var(--spacing-2xs);
	svg {
		transition: transform 0.3s ease;
	}
}
</style>
