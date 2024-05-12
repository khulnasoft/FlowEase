import { render } from '@testing-library/vue';
import FloweaseInput from '../Input.vue';

describe('FloweaseInput', () => {
	it('should render correctly', () => {
		const wrapper = render(FloweaseInput, {
			props: {
				name: 'input',
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should add .ph-no-capture class on password input', () => {
		const { container } = render(FloweaseInput, {
			props: {
				type: 'password',
			},
		});
		expect(container.firstChild).toHaveClass('ph-no-capture');
	});

	it('should not add .ph-no-capture class on other input types', () => {
		const { container } = render(FloweaseInput, {
			props: {
				type: 'number',
			},
		});
		expect(container.firstChild).not.toHaveClass('ph-no-capture');
	});
});
