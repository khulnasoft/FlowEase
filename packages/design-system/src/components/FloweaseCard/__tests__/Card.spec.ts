import { render } from '@testing-library/vue';
import FloweaseCard from '../Card.vue';

describe('components', () => {
	describe('FloweaseCard', () => {
		it('should render correctly', () => {
			const wrapper = render(FloweaseCard, {
				slots: {
					default: 'This is a card.',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should render correctly with header and footer', () => {
			const wrapper = render(FloweaseCard, {
				slots: {
					header: 'Header',
					default: 'This is a card.',
					footer: 'Footer',
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
