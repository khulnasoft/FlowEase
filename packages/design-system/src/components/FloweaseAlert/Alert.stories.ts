import type { StoryFn } from '@storybook/vue3';
import FloweaseAlert from './Alert.vue';
import FloweaseIcon from '../FloweaseIcon';

export default {
	title: 'Atoms/Alert',
	component: FloweaseAlert,
	argTypes: {
		type: {
			type: 'select',
			options: ['success', 'info', 'warning', 'error'],
		},
		effect: {
			type: 'select',
			options: ['light', 'dark'],
		},
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseAlert,
	},
	template:
		'<div style="position: relative; width: 100%; height: 300px;"><flowease-alert v-bind="args"><template #aside>custom content slot</template></flowease-alert></div>',
});

export const ContentAsProps = Template.bind({});
ContentAsProps.args = {
	type: 'info',
	effect: 'light',
	title: 'Alert title',
	description: 'Alert description',
	center: false,
	showIcon: true,
	background: true,
};

const TemplateForSlots: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseAlert,
		FloweaseIcon,
	},
	template: `<div style="position: relative; width: 100%; height: 300px;">
			  <flowease-alert v-bind="args">
					<template #title>Title</template>
					Description
					<template #aside><button>Button</button></template>
					<template #icon>
						<flowease-icon icon="grin-stars" size="xlarge" />
					</template>
				</flowease-alert>
		</div>`,
});

export const ContentInSlots = TemplateForSlots.bind({});
ContentInSlots.args = {
	type: 'info',
	effect: 'light',
	center: false,
	background: true,
	showIcon: false,
};
