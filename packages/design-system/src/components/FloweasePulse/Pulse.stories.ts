import FloweasePulse from './Pulse.vue';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/Pulse',
	component: FloweasePulse,
	argTypes: {},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

export const Default: StoryFn = () => ({
	components: {
		FloweasePulse,
	},
	template: '<flowease-pulse> yo </flowease-pulse>',
});
