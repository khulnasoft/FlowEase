import FloweaseInputLabel from './InputLabel.vue';
import FloweaseInput from '../FloweaseInput';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/Input Label',
	component: FloweaseInputLabel,
	argTypes: {},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseInputLabel,
		FloweaseInput,
	},
	template: `<div style="margin-top:50px">
			<flowease-input-label v-bind="args">
				<flowease-input />
			</flowease-input-label>
		</div>`,
});

export const InputLabel = Template.bind({});
InputLabel.args = {
	label: 'input label',
	tooltipText: 'more info...',
};
