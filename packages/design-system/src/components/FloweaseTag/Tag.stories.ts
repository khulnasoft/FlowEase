import type { StoryFn } from '@storybook/vue3';
import FloweaseTag from './Tag.vue';

export default {
	title: 'Atoms/Tag',
	component: FloweaseTag,
	argTypes: {
		text: {
			control: {
				control: 'text',
			},
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseTag,
	},
	template: '<flowease-tag v-bind="args"></flowease-tag>',
});

export const Tag = Template.bind({});
Tag.args = {
	text: 'tag name',
};
