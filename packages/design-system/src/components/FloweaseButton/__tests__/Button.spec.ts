import { render } from '@testing-library/vue';
import FloweaseButton from '../Button.vue';

const slots = {
	default: 'Button',
};
const stubs = ['flowease-spinner', 'flowease-icon'];

describe('components', () => {
	describe('FloweaseButton', () => {
		it('should render correctly', () => {
			const wrapper = render(FloweaseButton, {
				slots,
				global: {
					stubs,
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});

		describe('props', () => {
			describe('loading', () => {
				it('should render loading spinner', () => {
					const wrapper = render(FloweaseButton, {
						props: {
							loading: true,
						},
						slots,
						global: {
							stubs,
						},
					});
					expect(wrapper.html()).toMatchSnapshot();
				});
			});

			describe('icon', () => {
				it('should render icon button', () => {
					const wrapper = render(FloweaseButton, {
						props: {
							icon: 'plus-circle',
						},
						slots,
						global: {
							stubs,
						},
					});
					expect(wrapper.html()).toMatchSnapshot();
				});
			});

			describe('square', () => {
				it('should render square button', () => {
					const wrapper = render(FloweaseButton, {
						props: {
							square: true,
							label: '48',
						},
						global: {
							stubs,
						},
					});
					expect(wrapper.html()).toMatchSnapshot();
				});
			});
		});
	});
});
