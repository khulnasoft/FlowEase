import { render } from '@testing-library/vue';
import FloweaseDatatable from '../Datatable.vue';
import { rows, columns } from './data';

const stubs = ['flowease-select', 'flowease-option', 'flowease-button', 'flowease-pagination'];

describe('components', () => {
	describe('FloweaseDatatable', () => {
		const rowsPerPage = 10;

		it('should render correctly', () => {
			const wrapper = render(FloweaseDatatable, {
				props: {
					columns,
					rows,
					rowsPerPage,
				},
				global: {
					stubs,
				},
			});

			expect(wrapper.container.querySelectorAll('thead tr').length).toEqual(1);
			expect(wrapper.container.querySelectorAll('tbody tr').length).toEqual(rowsPerPage);
			expect(wrapper.container.querySelectorAll('tbody tr td').length).toEqual(
				columns.length * rowsPerPage,
			);
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should add column classes', () => {
			const wrapper = render(FloweaseDatatable, {
				props: {
					columns: columns.map((column) => ({ ...column, classes: ['example'] })),
					rows,
					rowsPerPage,
				},
				global: {
					stubs,
				},
			});

			expect(wrapper.container.querySelectorAll('.example').length).toEqual(
				columns.length * (rowsPerPage + 1),
			);
		});

		it('should render row slot', () => {
			const wrapper = render(FloweaseDatatable, {
				props: {
					columns,
					rows,
					rowsPerPage,
				},
				global: {
					stubs,
				},
				slots: {
					row: '<template #row="props"><td v-for="column in props.columns" :key="column.id">Row slot</td></template>', // Wrapper is necessary for looping
				},
			});

			expect(wrapper.container.querySelectorAll('tbody td').length).toEqual(
				columns.length * rowsPerPage,
			);
			expect(wrapper.container.querySelector('tbody td')?.textContent).toEqual('Row slot');
		});
	});
});
