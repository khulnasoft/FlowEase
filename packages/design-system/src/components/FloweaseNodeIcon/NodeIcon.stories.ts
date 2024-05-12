import FloweaseNodeIcon from './NodeIcon.vue';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/NodeIcon',
	component: FloweaseNodeIcon,
};

const DefaultTemplate: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseNodeIcon,
	},
	template: '<flowease-node-icon v-bind="args"></flowease-node-icon>',
});

export const FileIcon = DefaultTemplate.bind({});
FileIcon.args = {
	type: 'file',
	src: 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/cartman.svg',
	size: 200,
};

export const FontIcon = DefaultTemplate.bind({});
FontIcon.args = {
	type: 'icon',
	name: 'cogs',
	size: 200,
};

export const Hoverable = DefaultTemplate.bind({});
Hoverable.args = {
	type: 'icon',
	name: 'heart',
	color: 'red',
	size: 200,
	nodeTypeName: 'We ❤️ flowease',
	showTooltip: true,
};

export const Unknown = DefaultTemplate.bind({});
Unknown.args = {
	type: 'unknown',
	nodeTypeName: '',
	size: 40,
	color: 'red',
};
