import FloweaseCircleLoader from './CircleLoader.vue';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/CircleLoader',
	component: FloweaseCircleLoader,
	argTypes: {
		radius: {
			control: {
				type: 'number',
			},
		},
		progress: {
			control: {
				type: 'number',
			},
		},
		strokeWidth: {
			control: {
				type: 'number',
			},
		},
	},
};

interface Args {
	radius: number;
	progress: number;
	strokeWidth: number;
}

const template: StoryFn<Args> = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseCircleLoader,
	},
	template: `
		<div>
			<flowease-circle-loader v-bind="args" />
		</div>
	`,
});

export const defaultCircleLoader = template.bind({});
defaultCircleLoader.args = {
	radius: 20,
	progress: 42,
	strokeWidth: 10,
};
