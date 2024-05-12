import FloweaseInfoAccordion from './InfoAccordion.vue';
import type { StoryFn } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Atoms/Info Accordion',
	component: FloweaseInfoAccordion,
	argTypes: {},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const methods = {
	onClick: action('click'),
};

export const Default: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseInfoAccordion,
	},
	template: '<flowease-info-accordion v-bind="args" @click="onClick" />',
	methods,
});

Default.args = {
	title: 'my title',
	description: 'my description',
};
