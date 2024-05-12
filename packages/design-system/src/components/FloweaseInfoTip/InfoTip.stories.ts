import type { StoryFn } from '@storybook/vue3';
import FloweaseInfoTip from './InfoTip.vue';

export default {
	title: 'Atoms/InfoTip',
	component: FloweaseInfoTip,
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseInfoTip,
	},
	template:
		'<flowease-info-tip v-bind="args">Need help doing something? <a href="/docs" target="_blank">Open docs</a></flowease-info-tip>',
});

export const Note = Template.bind({});

export const Tooltip = Template.bind({});
Tooltip.args = {
	type: 'tooltip',
	tooltipPlacement: 'right',
};
