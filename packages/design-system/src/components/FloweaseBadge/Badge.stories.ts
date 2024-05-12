import type { StoryFn } from '@storybook/vue3';
import FloweaseBadge from './Badge.vue';

export default {
	title: 'Atoms/Badge',
	component: FloweaseBadge,
	argTypes: {
		theme: {
			type: 'text',
			options: ['default', 'primary', 'secondary', 'tertiary'],
		},
		size: {
			type: 'select',
			options: ['small', 'medium', 'large'],
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseBadge,
	},
	template: '<flowease-badge v-bind="args">Badge</flowease-badge>',
});

export const Badge = Template.bind({});
Badge.args = {};
