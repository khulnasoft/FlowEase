import type { StoryFn } from '@storybook/vue3';
import FloweaseTags from './Tags.vue';

export default {
	title: 'Atoms/Tags',
	component: FloweaseTags,
	argTypes: {},
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseTags,
	},
	template: '<flowease-tags v-bind="args"></flowease-tags>',
});

export const Tags = Template.bind({});
Tags.args = {
	tags: [
		{
			id: 1,
			name: 'very long tag name',
		},
		{
			id: 2,
			name: 'tag1',
		},
		{
			id: 3,
			name: 'tag2 yo',
		},
	],
};

export const Truncated = Template.bind({});
Truncated.args = {
	truncate: true,
	tags: [
		{
			id: 1,
			name: 'very long tag name',
		},
		{
			id: 2,
			name: 'tag1',
		},
		{
			id: 3,
			name: 'tag2 yo',
		},
		{
			id: 4,
			name: 'tag3',
		},
		{
			id: 5,
			name: 'tag4',
		},
	],
};
