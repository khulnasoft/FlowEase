import FloweaseFormInput from './FormInput.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Modules/FormInput',
	component: FloweaseFormInput,
	argTypes: {},
};

const methods = {
	onUpdateModelValue: action('update:modelValue'),
	onFocus: action('focus'),
	onChange: action('change'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseFormInput,
	},
	template: `
		<flowease-form-input v-bind="args" v-model="val" @update:modelValue="onUpdateModelValue" @change="onChange" @focus="onFocus" />
	`,
	methods,
	data() {
		return {
			val: '',
		};
	},
});

export const FormInput = Template.bind({});
FormInput.args = {
	label: 'Label',
	placeholder: 'placeholder',
};
