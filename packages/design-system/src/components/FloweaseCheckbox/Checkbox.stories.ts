import FloweaseCheckbox from './Checkbox.vue';
import type { StoryFn } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Atoms/Checkbox',
	component: FloweaseCheckbox,
};

const methods = {
	onUpdateModelValue: action('update:modelValue'),
	onFocus: action('focus'),
	onChange: action('change'),
};

const DefaultTemplate: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseCheckbox,
	},
	data: () => ({
		isChecked: false,
	}),
	template:
		'<flowease-checkbox v-model="isChecked" v-bind="args" @update:modelValue="onUpdateModelValue"></flowease-checkbox>',
	methods,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
	label: 'This is a default checkbox',
	tooltipText: 'Checkbox tooltip',
	disabled: false,
	indeterminate: false,
	size: 'small',
};
