import { render } from '@testing-library/vue';
import FloweaseBadge from '../Badge.vue';

describe('components', () => {
	describe('FloweaseBadge', () => {
		describe('props', () => {
			it('should render default theme correctly', () => {
				const wrapper = render(FloweaseBadge, {
					props: {
						theme: 'default',
						size: 'large',
						bold: true,
					},
					slots: {
						default: '<flowease-text>Default badge</flowease-text>',
					},
					global: {
						stubs: ['flowease-text'],
					},
				});
				expect(wrapper.html()).toMatchSnapshot();
			});
			it('should render secondary theme correctly', () => {
				const wrapper = render(FloweaseBadge, {
					props: {
						theme: 'secondary',
						size: 'medium',
						bold: false,
					},
					slots: {
						default: '<flowease-text>Secondary badge</flowease-text>',
					},
					global: {
						stubs: ['flowease-text'],
					},
				});
				expect(wrapper.html()).toMatchSnapshot();
			});
			it('should render with default values correctly', () => {
				const wrapper = render(FloweaseBadge, {
					slots: {
						default: '<flowease-text>A Badge</flowease-text>',
					},
					global: {
						stubs: ['flowease-text'],
					},
				});
				expect(wrapper.html()).toMatchSnapshot();
			});
		});
	});
});
