import { render } from '@testing-library/vue';
import FloweaseCheckbox from '../Checkbox.vue';

describe('components', () => {
	describe('FloweaseCheckbox', () => {
		it('should render without label and child content', () => {
			const { container } = render(FloweaseCheckbox);
			expect(container).toMatchSnapshot();
		});

		it('should render with label', () => {
			const { container } = render(FloweaseCheckbox, { props: { label: 'Checkbox' } });
			expect(container).toMatchSnapshot();
		});

		it('should render with child', () => {
			const { container } = render(FloweaseCheckbox, {
				slots: { default: '<strong>Bold text</strong>' },
			});
			expect(container).toMatchSnapshot();
		});

		it('should render with both child and label', () => {
			const { container } = render(FloweaseCheckbox, {
				props: { label: 'Checkbox' },
				slots: { default: '<strong>Bold text</strong>' },
			});
			expect(container).toMatchSnapshot();
		});
	});
});
