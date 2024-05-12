import { render } from '@testing-library/vue';
import FloweaseColorPicker from '../ColorPicker.vue';

describe('components', () => {
	describe('FloweaseColorPicker', () => {
		it('should render with input', () => {
			const { container } = render(FloweaseColorPicker, {
				props: {
					name: 'color-picker',
				},
			});
			expect(container).toMatchSnapshot();
		});

		it('should render without input', () => {
			const { container } = render(FloweaseColorPicker, {
				props: {
					name: 'color-picker',
					showInput: false,
				},
			});
			expect(container).toMatchSnapshot();
		});
	});
});
