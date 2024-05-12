import FloweaseCard from './Card.vue';
import type { StoryFn } from '@storybook/vue3';
import FloweaseButton from '../FloweaseButton/Button.vue';
import FloweaseIcon from '../FloweaseIcon/Icon.vue';
import FloweaseText from '../FloweaseText/Text.vue';

export default {
	title: 'Atoms/Card',
	component: FloweaseCard,
};

export const Default: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseCard,
	},
	template: '<flowease-card v-bind="args">This is a card.</flowease-card>',
});

export const Hoverable: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseCard,
		FloweaseIcon,
		FloweaseText,
	},
	template: `<div style="width: 140px; text-align: center;">
		<flowease-card v-bind="args">
			<flowease-icon icon="plus" size="xlarge" />
			<flowease-text size="large" class="mt-2xs">Add</flowease-text>
		</flowease-card>
	</div>`,
});

Hoverable.args = {
	hoverable: true,
};

export const WithSlots: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseCard,
		FloweaseButton,
		FloweaseIcon,
		FloweaseText,
	},
	template: `<flowease-card v-bind="args">
		<template #prepend>
			<flowease-icon icon="check" size="large" />
		</template>
		<template #header>
			<strong>Card header</strong>
		</template>
		<flowease-text color="text-light" size="medium" class="mt-2xs mb-2xs">
			This is the card body.
		</flowease-text>
		<template #footer>
			<flowease-text size="medium">
				Card footer
			</flowease-text>
		</template>
		<template #append>
			<flowease-button>Click me</flowease-button>
		</template>
	</flowease-card>`,
});
