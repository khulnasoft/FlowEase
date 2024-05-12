import FloweaseKeyboardShorcut from './FloweaseKeyboardShortcut.vue';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/KeyboardShortcut',
	component: FloweaseKeyboardShorcut,
};

const template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseKeyboardShorcut,
	},
	template: '<flowease-keyboard-shortcut v-bind="args" />',
});

export const defaultShortcut = template.bind({});
defaultShortcut.args = {
	keys: ['s'],
	altKey: true,
	metaKey: true,
	shiftKey: true,
};
