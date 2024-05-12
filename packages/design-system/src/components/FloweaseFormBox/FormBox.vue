<template>
	<div :class="['flowease-form-box', $style.container]">
		<div v-if="title" :class="$style.heading">
			<FloweaseHeading size="xlarge">
				{{ title }}
			</FloweaseHeading>
		</div>
		<div :class="$style.inputsContainer">
			<FloweaseFormInputs
				:inputs="inputs"
				:event-bus="formBus"
				:column-view="true"
				@update="onUpdateModelValue"
				@submit="onSubmit"
			/>
		</div>
		<div v-if="secondaryButtonText || buttonText" :class="$style.buttonsContainer">
			<span v-if="secondaryButtonText" :class="$style.secondaryButtonContainer">
				<FloweaseLink size="medium" theme="text" @click="onSecondaryButtonClick">
					{{ secondaryButtonText }}
				</FloweaseLink>
			</span>
			<FloweaseButton
				v-if="buttonText"
				:label="buttonText"
				:loading="buttonLoading"
				data-test-id="form-submit-button"
				size="large"
				@click="onButtonClick"
			/>
		</div>
		<div :class="$style.actionContainer">
			<FloweaseLink v-if="redirectText && redirectLink" :to="redirectLink">
				{{ redirectText }}
			</FloweaseLink>
		</div>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import FloweaseFormInputs from '../FloweaseFormInputs';
import FloweaseHeading from '../FloweaseHeading';
import FloweaseLink from '../FloweaseLink';
import FloweaseButton from '../FloweaseButton';
import type { IFormInput } from '@/types';
import { createEventBus } from '../../utils';

interface FormBoxProps {
	title?: string;
	inputs?: IFormInput[];
	buttonText?: string;
	buttonLoading?: boolean;
	secondaryButtonText?: string;
	redirectText?: string;
	redirectLink?: string;
}

defineOptions({ name: 'FloweaseFormBox' });
withDefaults(defineProps<FormBoxProps>(), {
	title: '',
	inputs: () => [],
	buttonLoading: false,
	redirectText: '',
	redirectLink: '',
});

const formBus = createEventBus();
const $emit = defineEmits(['submit', 'update', 'secondaryClick']);

const onUpdateModelValue = (e: { name: string; value: string }) => $emit('update', e);
const onSubmit = (e: { [key: string]: string }) => $emit('submit', e);
const onButtonClick = () => formBus.emit('submit');
const onSecondaryButtonClick = (event: Event) => $emit('secondaryClick', event);
</script>

<style lang="scss" module>
.heading {
	display: flex;
	justify-content: center;
	margin-bottom: var(--spacing-xl);
}

.container {
	background-color: var(--color-background-xlight);
	padding: var(--spacing-l);
	border: var(--border-base);
	border-radius: var(--border-radius-large);
	box-shadow: 0px 4px 16px rgba(99, 77, 255, 0.06);
}

.inputsContainer {
	margin-bottom: var(--spacing-xl);
}

.actionContainer {
	display: flex;
	justify-content: center;
}

.buttonsContainer {
	composes: actionContainer;
	margin-bottom: var(--spacing-s);
}

.secondaryButtonContainer {
	flex-grow: 1;
	display: flex;
	align-items: center;
}

.withLabel {
	margin-bottom: var(--spacing-s);
}
</style>
