<template>
	<flowease-info-tip
		v-if="hasStaleData"
		theme="warning"
		type="tooltip"
		tooltip-placement="right"
		data-test-id="node-run-info-stale"
	>
		<span
			v-html="
				$locale.baseText(
					hasPinData
						? 'ndv.output.staleDataWarning.pinData'
						: 'ndv.output.staleDataWarning.regular',
				)
			"
		></span>
	</flowease-info-tip>
	<flowease-info-tip
		v-else-if="runMetadata"
		type="tooltip"
		:theme="theme"
		:data-test-id="`node-run-info-${theme}`"
		tooltip-placement="right"
	>
		<div>
			<flowease-text :bold="true" size="small"
				>{{
					runTaskData.error
						? $locale.baseText('runData.executionStatus.failed')
						: $locale.baseText('runData.executionStatus.success')
				}} </flowease-text
			><br />
			<flowease-text :bold="true" size="small">{{
				$locale.baseText('runData.startTime') + ':'
			}}</flowease-text>
			{{ runMetadata.startTime }}<br />
			<flowease-text :bold="true" size="small">{{
				$locale.baseText('runData.executionTime') + ':'
			}}</flowease-text>
			{{ runMetadata.executionTime }} {{ $locale.baseText('runData.ms') }}
		</div>
	</flowease-info-tip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { ITaskData } from 'flowease-workflow';
import { convertToDisplayDateComponents } from '@/utils/formatters/dateFormatter';

export default defineComponent({
	props: {
		taskData: {}, // ITaskData
		hasStaleData: Boolean,
		hasPinData: Boolean,
	},

	computed: {
		theme(): string {
			return this.runTaskData?.error ? 'danger' : 'success';
		},
		runTaskData(): ITaskData {
			return this.taskData as ITaskData;
		},
		runMetadata(): { executionTime: number; startTime: string } | null {
			if (!this.runTaskData) {
				return null;
			}
			const { date, time } = convertToDisplayDateComponents(this.runTaskData.startTime);
			return {
				executionTime: this.runTaskData.executionTime,
				startTime: `${date} at ${time}`,
			};
		},
	},
});
</script>
