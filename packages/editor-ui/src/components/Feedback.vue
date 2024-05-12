<script lang="ts" setup>
import { useI18n } from '@/composables/useI18n';
import type { PropType } from 'vue';

const emit = defineEmits<{
	(e: 'update:modelValue', feedback: 'positive' | 'negative'): void;
}>();

defineProps({
	modelValue: {
		type: String as PropType<'positive' | 'negative' | undefined>,
		default: undefined,
	},
});

const i18n = useI18n();

function onFeedback(feedback: 'positive' | 'negative') {
	emit('update:modelValue', feedback);
}
</script>
<template>
	<div class="feedback">
		<FloweaseText v-if="!modelValue" class="mr-2xs">
			{{ i18n.baseText('feedback.title') }}
		</FloweaseText>
		<FloweaseText v-else :color="modelValue === 'positive' ? 'success' : 'danger'">
			<FontAwesomeIcon
				:icon="modelValue === 'positive' ? 'thumbs-up' : 'thumbs-down'"
				class="mr-2xs"
			/>
			{{ i18n.baseText(`feedback.${modelValue}`) }}
		</FloweaseText>
		<FloweaseTooltip v-if="!modelValue" :content="i18n.baseText('feedback.positive')">
			<span
				class="feedback-button"
				data-test-id="feedback-button-positive"
				@click="onFeedback('positive')"
			>
				<FontAwesomeIcon icon="thumbs-up" />
			</span>
		</FloweaseTooltip>
		<FloweaseTooltip v-if="!modelValue" :content="i18n.baseText('feedback.negative')">
			<span
				class="feedback-button"
				data-test-id="feedback-button-negative"
				@click="onFeedback('negative')"
			>
				<FontAwesomeIcon icon="thumbs-down" />
			</span>
		</FloweaseTooltip>
	</div>
</template>

<style lang="scss">
.feedback {
	display: flex;
	align-items: center;

	.feedback-button {
		cursor: pointer;
		width: var(--spacing-2xl);
		height: var(--spacing-2xl);
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			color: var(--color-primary);
		}
	}
}
</style>
