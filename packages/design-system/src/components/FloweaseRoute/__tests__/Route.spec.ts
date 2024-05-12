import { render } from '@testing-library/vue';
import FloweaseRoute from '../Route.vue';

describe('FloweaseRoute', () => {
	it('should render internal router links', () => {
		const wrapper = render(FloweaseRoute, {
			props: {
				to: '/test',
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render internal links with newWindow=true', () => {
		const wrapper = render(FloweaseRoute, {
			props: {
				to: '/test',
				newWindow: true,
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render external links', () => {
		const wrapper = render(FloweaseRoute, {
			props: {
				to: 'https://example.com/',
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
