import { render } from '@testing-library/vue';
import FloweaseInfoTip from '../InfoTip.vue';

const slots = {
	default: ['Need help doing something?', '<a href="/docs" target="_blank">Open docs</a>'],
};
const stubs = ['flowease-tooltip'];

describe('FloweaseInfoTip', () => {
	it('should render correctly as note', () => {
		const wrapper = render(FloweaseInfoTip, {
			slots,
			global: {
				stubs,
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render correctly as tooltip', () => {
		const wrapper = render(FloweaseInfoTip, {
			slots,
			props: {
				type: 'tooltip',
			},
			global: {
				stubs,
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
