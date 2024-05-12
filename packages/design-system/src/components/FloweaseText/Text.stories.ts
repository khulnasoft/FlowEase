import type { StoryFn } from '@storybook/vue3';
import FloweaseText from './Text.vue';

export default {
	title: 'Atoms/Text',
	component: FloweaseText,
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['xsmall', 'small', 'medium', 'large'],
		},
		color: {
			control: {
				type: 'select',
			},
			options: [
				'primary',
				'text-dark',
				'text-base',
				'text-light',
				'text-xlight',
				'danger',
				'success',
			],
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseText,
	},
	template: '<flowease-text v-bind="args">hello world</flowease-text>',
});

export const Text = Template.bind({});
