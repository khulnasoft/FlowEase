import type { StoryFn } from '@storybook/vue3';
import FloweaseBlockUi from './BlockUi.vue';

export default {
	title: 'Atoms/BlockUI',
	component: FloweaseBlockUi,
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseBlockUi,
	},
	template:
		'<div style="position: relative; width: 100%; height: 300px;"><flowease-block-ui v-bind="args" /></div>',
});

export const BlockUi = Template.bind({});
BlockUi.args = {
	show: false,
};
