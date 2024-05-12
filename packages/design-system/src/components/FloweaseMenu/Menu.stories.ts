import FloweaseMenu from './Menu.vue';
import FloweaseIcon from '../FloweaseIcon';
import FloweaseText from '../FloweaseText';
import type { StoryFn } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Atoms/Menu',
	component: FloweaseMenu,
	argTypes: {},
};

const methods = {
	onSelect: action('select'),
};

const template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseMenu,
	},
	template: `
		<div style="height: 90vh; width: 200px">
			<flowease-menu v-bind="args" @select="onSelect"></flowease-menu>
		</div>
	`,
	methods,
});

const templateWithHeaderAndFooter: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseMenu,
		FloweaseIcon,
		FloweaseText,
	},
	template: `
		<div style="height: 90vh; width: 200px">
			<flowease-menu v-bind="args" @select="onSelect">
				<template #header>
					<a href="#" class="p-m hideme" style="display: block;">
						<flowease-icon icon="long-arrow-alt-left"/>&nbsp;&nbsp;Back to home
					</a>
				</template>
				<template #footer>
					<div class="p-m hideme">
						<flowease-icon icon="user-circle" size="xlarge"/>&nbsp;&nbsp;
						<flowease-text>John Smithson</flowease-text>
					</div>
				</template>
			</flowease-menu>
		</div>
	`,
	methods,
});

const templateWithAllSlots: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseMenu,
		FloweaseIcon,
		FloweaseText,
	},
	template: `
		<div style="height: 90vh; width: 200px">
			<flowease-menu v-bind="args" @select="onSelect">
				<template #header>
					<a href="#" class="p-m hideme" style="display: block;">
						<flowease-icon icon="long-arrow-alt-left"/>&nbsp;&nbsp;Back to home
					</a>
				</template>
				<template #menuPrefix>
					<flowease-text class="hideme" size="small"  color="text-light">Something can be added here...</flowease-text>
				</template>
				<template #menuSuffix>
					<flowease-text class="hideme" size="small" color="text-light">...and here if needed</flowease-text>
				</template>
				<template #footer>
					<div class="p-m hideme">
						<flowease-icon icon="user-circle" size="xlarge"/>&nbsp;&nbsp;
						<flowease-text>John Smithson</flowease-text>
					</div>
				</template>
			</flowease-menu>
		</div>
	`,
	methods,
});

const menuItems = [
	{
		id: 'workflows',
		icon: 'network-wired',
		label: 'Workflows',
		position: 'top',
	},
	{
		id: 'executions',
		icon: 'tasks',
		label: 'Executions',
		position: 'top',
	},
	{
		id: 'disabled-item',
		icon: 'times',
		label: 'Not Available',
		available: false,
		position: 'top',
	},
	{
		id: 'website',
		icon: 'globe',
		label: 'Website',
		link: {
			href: 'https://www.flowease.khulnasoft.com',
			target: '_blank',
		},
		position: 'bottom',
	},
	{
		id: 'help',
		icon: 'question',
		label: 'Help',
		position: 'bottom',
		children: [
			{ icon: 'info', label: 'About flowease', id: 'about' },
			{ icon: 'book', label: 'Documentation', id: 'docs' },
			{
				id: 'disabled-submenu-item',
				icon: 'times',
				label: 'Not Available',
				available: false,
				position: 'top',
			},
			{
				id: 'quickstart',
				icon: 'video',
				label: 'Quickstart',
				link: {
					href: 'https://www.youtube.com/watch?v=RpjQTGKm-ok',
					target: '_blank',
				},
			},
		],
	},
];

export const primary = template.bind({});
primary.args = {
	items: menuItems,
};

export const withHeaderAndFooter = templateWithHeaderAndFooter.bind({});
withHeaderAndFooter.args = { items: menuItems };

export const withAllSlots = templateWithAllSlots.bind({});
withAllSlots.args = { items: menuItems };
