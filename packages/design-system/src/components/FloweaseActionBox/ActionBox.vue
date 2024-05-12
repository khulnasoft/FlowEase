<template>
	<div :class="['flowease-action-box', $style.container]" data-test-id="action-box">
		<div v-if="emoji" :class="$style.emoji">
			{{ emoji }}
		</div>
		<div v-if="heading || $slots.heading" :class="$style.heading">
			<FloweaseHeading size="xlarge" align="center">
				<slot name="heading">{{ heading }}</slot>
			</FloweaseHeading>
		</div>
		<div :class="$style.description" @click="$emit('descriptionClick', $event)">
			<FloweaseText color="text-base">
				<slot name="description">
					<span v-html="description"></span>
				</slot>
			</FloweaseText>
		</div>
		<FloweaseButton
			v-if="buttonText"
			:label="buttonText"
			:type="buttonType"
			size="large"
			@click="$emit('click:button', $event)"
		/>
		<FloweaseCallout
			v-if="calloutText"
			:theme="calloutTheme"
			:icon="calloutIcon"
			:class="$style.callout"
		>
			<FloweaseText color="text-base">
				<span size="small" v-html="calloutText"></span>
			</FloweaseText>
		</FloweaseCallout>
	</div>
</template>

<script lang="ts" setup>
import FloweaseButton from '../FloweaseButton';
import FloweaseHeading from '../FloweaseHeading';
import FloweaseText from '../FloweaseText';
import FloweaseCallout, { type CalloutTheme } from '../FloweaseCallout';
import type { ButtonType } from '@/types/button';

interface ActionBoxProps {
	emoji: string;
	heading: string;
	buttonText: string;
	buttonType: ButtonType;
	description: string;
	calloutText: string;
	calloutTheme: CalloutTheme;
	calloutIcon: string;
}

defineOptions({ name: 'FloweaseActionBox' });
withDefaults(defineProps<ActionBoxProps>(), {
	calloutTheme: 'info',
});
</script>

<style lang="scss" module>
.container {
	border: 2px dashed var(--color-foreground-base);
	border-radius: var(--border-radius-large);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--spacing-3xl);

	> * {
		margin-bottom: var(--spacing-l);

		&:last-child {
			margin-bottom: 0;
		}
	}
}

.emoji {
	font-size: 40px;
}

.heading {
	margin-bottom: var(--spacing-l);
	text-align: center;
}

.description {
	color: var(--color-text-base);
	margin-bottom: var(--spacing-xl);
	text-align: center;
}

.callout {
	width: 100%;
	text-align: left;
}
</style>
