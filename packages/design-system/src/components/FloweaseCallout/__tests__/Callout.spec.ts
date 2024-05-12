import { render } from '@testing-library/vue';
import FloweaseCallout from '../Callout.vue';

describe('components', () => {
	describe('FloweaseCallout', () => {
		it('should render info theme correctly', () => {
			const wrapper = render(FloweaseCallout, {
				props: {
					theme: 'info',
				},
				global: {
					stubs: ['flowease-icon', 'flowease-text'],
				},
				slots: {
					default: '<flowease-text size="small">This is an info callout.</flowease-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render success theme correctly', () => {
			const wrapper = render(FloweaseCallout, {
				props: {
					theme: 'success',
				},
				global: {
					stubs: ['flowease-icon', 'flowease-text'],
				},
				slots: {
					default: '<flowease-text size="small">This is a success callout.</flowease-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render warning theme correctly', () => {
			const wrapper = render(FloweaseCallout, {
				props: {
					theme: 'warning',
				},
				global: {
					stubs: ['flowease-icon', 'flowease-text'],
				},
				slots: {
					default: '<flowease-text size="small">This is a warning callout.</flowease-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render danger theme correctly', () => {
			const wrapper = render(FloweaseCallout, {
				props: {
					theme: 'danger',
				},
				global: {
					stubs: ['flowease-icon', 'flowease-text'],
				},
				slots: {
					default: '<flowease-text size="small">This is a danger callout.</flowease-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render secondary theme correctly', () => {
			const wrapper = render(FloweaseCallout, {
				props: {
					theme: 'secondary',
				},
				global: {
					stubs: ['flowease-icon', 'flowease-text'],
				},
				slots: {
					default: '<flowease-text size="small">This is a secondary callout.</flowease-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render custom theme correctly', () => {
			const wrapper = render(FloweaseCallout, {
				props: {
					theme: 'custom',
					icon: 'code-branch',
				},
				global: {
					stubs: ['flowease-icon', 'flowease-text'],
				},
				slots: {
					default: '<flowease-text size="small">This is a secondary callout.</flowease-text>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
		it('should render additional slots correctly', () => {
			const wrapper = render(FloweaseCallout, {
				props: {
					theme: 'custom',
					icon: 'code-branch',
				},
				global: {
					stubs: ['flowease-icon', 'flowease-text', 'flowease-link'],
				},
				slots: {
					default: '<flowease-text size="small">This is a secondary callout.</flowease-text>',
					actions: '<flowease-link size="small">Do something!</flowease-link>',
					trailingContent:
						'<flowease-link theme="secondary" size="small" :bold="true" :underline="true" to="https://flowease.khulnasoft.com">Learn more</flowease-link>',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
