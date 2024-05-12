<template>
	<div :class="['workflow-executions-container', $style.container]">
		<div v-if="executionCount === 0" :class="[$style.messageContainer, $style.noExecutionsMessage]">
			<div v-if="!containsTrigger">
				<flowease-heading tag="h2" size="xlarge" color="text-dark" class="mb-2xs">
					{{ $locale.baseText('executionsLandingPage.emptyState.noTrigger.heading') }}
				</flowease-heading>
				<flowease-text size="medium">
					{{ $locale.baseText('executionsLandingPage.emptyState.message') }}
				</flowease-text>
				<flowease-button class="mt-l" type="tertiary" size="large" @click="onSetupFirstStep">
					{{ $locale.baseText('executionsLandingPage.emptyState.noTrigger.buttonText') }}
				</flowease-button>
			</div>
			<div v-else>
				<flowease-heading tag="h2" size="xlarge" color="text-dark" class="mb-2xs">
					{{ $locale.baseText('executionsLandingPage.emptyState.heading') }}
				</flowease-heading>
				<WorkflowExecutionsInfoAccordion />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { PLACEHOLDER_EMPTY_WORKFLOW_ID, VIEWS } from '@/constants';
import { useUIStore } from '@/stores/ui.store';
import { useWorkflowsStore } from '@/stores/workflows.store';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import WorkflowExecutionsInfoAccordion from './WorkflowExecutionsInfoAccordion.vue';

export default defineComponent({
	name: 'ExecutionsLandingPage',
	components: {
		WorkflowExecutionsInfoAccordion,
	},
	computed: {
		...mapStores(useUIStore, useWorkflowsStore),
		executionCount(): number {
			return this.workflowsStore.currentWorkflowExecutions.length;
		},
		containsTrigger(): boolean {
			return this.workflowsStore.workflowTriggerNodes.length > 0;
		},
	},
	methods: {
		onSetupFirstStep(event: MouseEvent): void {
			this.uiStore.addFirstStepOnLoad = true;
			const workflowRoute = this.getWorkflowRoute();
			void this.$router.push(workflowRoute);
		},
		getWorkflowRoute(): { name: string; params: {} } {
			const workflowId = this.workflowsStore.workflowId || this.$route.params.name;
			if (workflowId === PLACEHOLDER_EMPTY_WORKFLOW_ID) {
				return { name: VIEWS.NEW_WORKFLOW, params: {} };
			} else {
				return { name: VIEWS.WORKFLOW, params: { name: workflowId } };
			}
		},
	},
});
</script>

<style module lang="scss">
.container {
	width: 100%;
	height: 100%;
	flex: 1;
	background-color: var(--color-background-light);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.messageContainer {
	margin-top: var(--spacing-4xl);
	color: var(--color-text-base);

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
}

.icon {
	font-size: 24px;
	color: var(--color-foreground-dark);
}
</style>
