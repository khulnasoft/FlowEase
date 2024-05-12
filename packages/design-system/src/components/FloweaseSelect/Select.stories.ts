import type { StoryFn } from '@storybook/vue3';
import FloweaseSelect from './Select.vue';
import FloweaseOption from '../FloweaseOption';
import FloweaseIcon from '../FloweaseIcon';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Atoms/Select',
	component: FloweaseSelect,
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['large', 'medium', 'small', 'mini'],
		},
		loading: {
			control: {
				type: 'boolean',
			},
		},
		filterable: {
			control: {
				type: 'boolean',
			},
		},
		defaultFirstOption: {
			control: {
				type: 'boolean',
			},
		},
	},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const methods = {
	onUpdateModelValue: action('update:modelValue'),
	onChange: action('change'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseSelect,
		FloweaseOption,
		FloweaseIcon,
	},
	template:
		'<flowease-select v-bind="args" v-model="val" @update:modelValue="onUpdateModelValue" @change="onChange"><flowease-option value="1">op1</flowease-option><flowease-option value="2">op2</flowease-option></flowease-select>',
	data() {
		return {
			val: '',
		};
	},
	methods,
});

export const Input = Template.bind({});

export const Filterable = Template.bind({});
Filterable.args = {
	filterable: true,
	defaultFirstOption: true,
};

const selects = ['large', 'medium', 'small', 'mini']
	.map(
		(size) =>
			`<flowease-select v-bind="args" v-model="val" @update:modelValue="onUpdateModelValue" @change="onChange" size="${size}"><flowease-option value="1">op1</flowease-option><flowease-option value="2">op2</flowease-option></flowease-select>`,
	)
	.join('');

const ManyTemplate: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseSelect,
		FloweaseOption,
		FloweaseIcon,
	},
	template: `<div class="multi-container">${selects}</div>`,
	methods,
	data() {
		return {
			val: '',
		};
	},
});

export const Sizes = ManyTemplate.bind({});
Sizes.args = {
	type: 'text',
	label: 'text input:',
	placeholder: 'placeholder...',
};

const selectsWithIcon = ['xlarge', 'large', 'medium', 'small', 'mini']
	.map(
		(size) =>
			`<flowease-select v-bind="args" v-model="val" @update:modelValue="onUpdateModelValue" size="${size}"><flowease-icon icon="search" slot="prefix" /><flowease-option value="1">op1</flowease-option><flowease-option value="2">op2</flowease-option></flowease-select>`,
	)
	.join('');

const ManyTemplateWithIcon: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseSelect,
		FloweaseOption,
		FloweaseIcon,
	},
	template: `<div class="multi-container">${selectsWithIcon}</div>`,
	methods,
	data() {
		return {
			val: '',
		};
	},
});

export const WithIcon = ManyTemplateWithIcon.bind({});
WithIcon.args = {
	type: 'text',
	label: 'text input:',
	placeholder: 'placeholder...',
};

const LimitedWidthTemplate: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseSelect,
		FloweaseOption,
		FloweaseIcon,
	},
	template:
		'<div style="width:100px;"><flowease-select v-bind="args" v-model="val" @update:modelValue="onUpdateModelValue" @change="onChange"><flowease-option value="1" label="opt1 11 1111" /><flowease-option value="2" label="opt2 test very long ipsum"/></flowease-select></div>',
	data() {
		return {
			val: '',
		};
	},
	methods,
});

export const LimitedWidth = LimitedWidthTemplate.bind({});
LimitedWidth.args = {
	type: 'text',
	label: 'text input:',
	placeholder: 'placeholder...',
};
