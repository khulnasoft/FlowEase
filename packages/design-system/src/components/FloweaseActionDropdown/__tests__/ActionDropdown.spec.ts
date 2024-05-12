import { render } from '@testing-library/vue';
import FloweaseActionDropdown from '../ActionDropdown.vue';

describe('components', () => {
	describe('FloweaseActionDropdown', () => {
		it('should render default styling correctly', () => {
			const wrapper = render(FloweaseActionDropdown, {
				props: {
					teleported: false,
					items: [
						{
							id: 'item1',
							label: 'Action 1',
						},
						{
							id: 'item2',
							label: 'Action 2',
						},
					],
				},
				global: {
					stubs: [
						'flowease-icon',
						'el-tooltip',
						'el-dropdown',
						'el-dropdown-menu',
						'el-dropdown-item',
					],
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render custom styling correctly', () => {
			const wrapper = render(FloweaseActionDropdown, {
				props: {
					items: [
						{
							id: 'item1',
							label: 'Action 1',
							icon: 'thumbs-up',
						},
						{
							id: 'item2',
							label: 'Action 2',
							icon: 'thumbs-down',
							disabled: true,
						},
						{
							id: 'item3',
							label: 'Action 3',
							icon: 'heart',
							divided: true,
						},
					],
				},
				global: {
					stubs: ['flowease-icon', 'el-dropdown', 'el-dropdown-menu', 'el-dropdown-item'],
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
