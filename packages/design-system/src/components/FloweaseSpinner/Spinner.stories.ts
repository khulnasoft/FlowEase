import type { StoryFn } from '@storybook/vue3';
import FloweaseSpinner from './Spinner.vue';

export default {
	title: 'Atoms/Spinner',
	component: FloweaseSpinner,
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
		},
		type: {
			control: {
				type: 'select',
			},
			options: ['dots', 'ring'],
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseSpinner,
	},
	template: '<flowease-spinner v-bind="args" />',
});

export const Spinner = Template.bind({});
