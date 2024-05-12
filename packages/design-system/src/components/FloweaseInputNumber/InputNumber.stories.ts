import FloweaseInputNumber from './InputNumber.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/Input Number',
	component: FloweaseInputNumber,
	argTypes: {
		placeholder: {
			control: 'text',
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		controls: {
			control: {
				type: 'boolean',
			},
		},
		precision: {
			control: {
				type: 'number',
			},
		},
		min: {
			control: {
				type: 'number',
			},
		},
		max: {
			control: {
				type: 'number',
			},
		},
		step: {
			control: {
				type: 'number',
			},
		},
		title: {
			control: 'text',
		},
	},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const methods = {
	onUpdateModelValue: action('update:modelValue'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseInputNumber,
	},
	template:
		'<flowease-input-number v-bind="args" v-model="val" @update:modelValue="onUpdateModelValue" />',
	data() {
		return {
			val: null,
		};
	},
	methods,
});

export const Input = Template.bind({});
Input.args = {
	placeholder: 'placeholder...',
	controls: false,
};

const ManyTemplate: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseInputNumber,
	},
	template:
		'<div> <flowease-input-number style="margin-bottom:10px" v-bind="args" v-model="val" @update:modelValue="onUpdateModelValue" /> <flowease-input-number style="margin-bottom:10px" v-bind="args" size="medium" v-model="val" @update:modelValue="onUpdateModelValue" /> <flowease-input-number style="margin-bottom:10px" v-bind="args" size="small" v-model="val" @update:modelValue="onUpdateModelValue" /> <flowease-input-number style="margin-bottom:10px" v-bind="args" v-model="val" size="mini" @update:modelValue="onUpdateModelValue" /> </div>',
	methods,
	data() {
		return {
			val: '',
		};
	},
});

export const Sizes = ManyTemplate.bind({});
Sizes.args = {
	placeholder: 'placeholder...',
	controls: false,
};

const ControlsTemplate: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseInputNumber,
	},
	template:
		'<div> <flowease-input-number style="margin-bottom:10px" v-bind="args" v-model="val" @update:modelValue="onUpdateModelValue" /> <flowease-input-number style="margin-bottom:10px" v-bind="args" size="medium" v-model="val" @update:modelValue="onUpdateModelValue" /> <flowease-input-number style="margin-bottom:10px" v-bind="args" size="small" v-model="val" @update:modelValue="onUpdateModelValue" /> <flowease-input-number style="margin-bottom:10px" v-bind="args" v-model="val" size="mini" @update:modelValue="onUpdateModelValue" /> <flowease-input-number controls-position="right" style="margin-bottom:10px" v-bind="args" v-model="val" @update:modelValue="onUpdateModelValue" /> <flowease-input-number controls-position="right" style="margin-bottom:10px" v-bind="args" size="medium" v-model="val" @update:modelValue="onUpdateModelValue" /> <flowease-input-number controls-position="right" style="margin-bottom:10px" v-bind="args" size="small" v-model="val" @update:modelValue="onUpdateModelValue" /> <flowease-input-number controls-position="right" style="margin-bottom:10px" v-bind="args" v-model="val" size="mini" @update:modelValue="onUpdateModelValue" /> </div>',
	methods,
	data() {
		return {
			val: '',
		};
	},
});

export const Controls = ControlsTemplate.bind({});
Controls.args = {
	placeholder: 'placeholder...',
};
