import FloweaseIconButton from './IconButton.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/Icon Button',
	component: FloweaseIconButton,
	argTypes: {
		type: {
			control: 'select',
			options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['mini', 'small', 'medium', 'large', 'xlarge'],
		},
	},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const methods = {
	onClick: action('click'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseIconButton,
	},
	template: '<flowease-icon-button @click="onClick" v-bind="args" />',
	methods,
});

export const Button = Template.bind({});
Button.args = {
	icon: 'plus',
	title: 'my title',
};

const ManyTemplate: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseIconButton,
	},
	template:
		'<div> <flowease-icon-button v-bind="args" size="xlarge" @click="onClick" /> <flowease-icon-button v-bind="args" size="large" @click="onClick" />  <flowease-icon-button v-bind="args" size="medium" @click="onClick" />  <flowease-icon-button v-bind="args" size="small" @click="onClick" />  <flowease-icon-button v-bind="args" :loading="true" @click="onClick" />  <flowease-icon-button v-bind="args" :disabled="true" @click="onClick" /></div>',
	methods,
});

export const Primary = ManyTemplate.bind({});
Primary.args = {
	icon: 'plus',
	title: 'my title',
	type: 'primary',
};

export const Outline = ManyTemplate.bind({});
Outline.args = {
	icon: 'plus',
	title: 'my title',
	type: 'primary',
	outline: true,
};

export const Tertiary = ManyTemplate.bind({});
Tertiary.args = {
	icon: 'plus',
	title: 'my title',
	type: 'tertiary',
};

export const Text = ManyTemplate.bind({});
Text.args = {
	icon: 'plus',
	title: 'my title',
	type: 'text',
};
