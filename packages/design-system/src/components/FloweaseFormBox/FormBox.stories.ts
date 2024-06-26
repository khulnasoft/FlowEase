import FloweaseFormBox from './FormBox.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Modules/FormBox',
	component: FloweaseFormBox,
	argTypes: {},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const methods = {
	onSubmit: action('submit'),
	onChange: action('update'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseFormBox,
	},
	template: '<flowease-form-box v-bind="args" @submit="onSubmit" @update="onUpdate" />',
	methods,
});

export const FormBox = Template.bind({});
FormBox.args = {
	title: 'Form title',
	inputs: [
		{
			name: 'email',
			properties: {
				label: 'Your Email',
				type: 'email',
				required: true,
				validationRules: [{ name: 'VALID_EMAIL' }],
			},
		},
		{
			name: 'message',
			properties: {
				label: 'Please contact someone someday.',
				type: 'text',
			},
		},
		{
			name: 'password',
			properties: {
				label: 'Your Password',
				type: 'password',
				required: true,
				validationRules: [{ name: 'DEFAULT_PASSWORD_RULES' }],
			},
		},
		{
			name: 'nickname',
			properties: {
				label: 'Your Nickname',
				placeholder: 'Monty',
			},
		},
	],
	buttonText: 'Action',
	redirectText: 'Go somewhere',
	redirectLink: 'https://flowease.khulnasoft.com',
};
