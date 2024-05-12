import type { StoryFn } from '@storybook/vue3';
import FloweaseHeading from './Heading.vue';

export default {
	title: 'Atoms/Heading',
	component: FloweaseHeading,
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['2xlarge', 'xlarge', 'large', 'medium', 'small'],
		},
		color: {
			control: {
				type: 'select',
			},
			options: ['primary', 'text-dark', 'text-base', 'text-light', 'text-xlight'],
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseHeading,
	},
	template: '<flowease-heading v-bind="args">hello world</flowease-heading>',
});

export const Heading = Template.bind({});
