import FloweaseDatatable from './Datatable.vue';
import type { StoryFn } from '@storybook/vue3';
import { rows, columns } from './__tests__/data';

export default {
	title: 'Atoms/Datatable',
	component: FloweaseDatatable,
};

export const Default: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseDatatable,
	},
	template: '<flowease-datatable v-bind="args"></flowease-datatable>',
});

Default.args = {
	columns,
	rows,
};
