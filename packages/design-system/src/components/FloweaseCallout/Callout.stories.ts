import FloweaseCallout from './Callout.vue';
import FloweaseLink from '../FloweaseLink';
import FloweaseText from '../FloweaseText';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/Callout',
	component: FloweaseCallout,
	argTypes: {
		theme: {
			control: {
				type: 'select',
			},
			options: ['info', 'secondary', 'success', 'warning', 'danger', 'custom'],
		},
		message: {
			control: {
				type: 'text',
			},
		},
		icon: {
			control: {
				type: 'text',
			},
		},
	},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/tPpJvbrnHbP8C496cYuwyW/Node-pinning?node-id=15%3A5777',
		},
	},
};

interface Args {
	theme: string;
	icon: string;
	default: string;
	actions: string;
	trailingContent: string;
}

const template: StoryFn<Args> = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseLink,
		FloweaseText,
		FloweaseCallout,
	},
	template: `
		<flowease-callout v-bind="args">
			${args.default}
			<template #actions v-if="args.actions">
				${args.actions}
			</template>
			<template #trailingContent v-if="args.trailingContent">
				${args.trailingContent}
			</template>
		</flowease-callout>
	`,
});

export const defaultCallout = template.bind({});
defaultCallout.args = {
	theme: 'success',
	default: `
		This is a default callout.
	`,
};

export const customCallout = template.bind({});
customCallout.args = {
	theme: 'custom',
	icon: 'code-branch',
	default: `
		This is a custom callout.
	`,
	actions: `
		<flowease-link size="small">
			Do something!
		</flowease-link>
	`,
};

export const secondaryCallout = template.bind({});
secondaryCallout.args = {
	theme: 'secondary',
	icon: 'thumbtack',
	default: `
		This data is pinned.
	`,
	actions: `
		<flowease-link theme="secondary" size="small" :bold="true" :underline="true">
			Unpin
		</flowease-link>
	`,
	trailingContent: `
		<flowease-link
			theme="secondary"
			size="small"
			:bold="true"
			:underline="true"
			to="https://flowease.khulnasoft.com"
		>
			Learn more
		</flowease-link>
	`,
};
