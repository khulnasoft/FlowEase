import FloweaseLink from './Link.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/Link',
	component: FloweaseLink,
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['small', 'medium', 'large'],
		},
	},
};

const methods = {
	onClick: action('click'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseLink,
	},
	template: '<flowease-link v-bind="args" @click="onClick">hello world</flowease-link>',
	methods,
});

export const Link = Template.bind({});
Link.args = {
	href: 'https://flowease.khulnasoft.com/',
};
