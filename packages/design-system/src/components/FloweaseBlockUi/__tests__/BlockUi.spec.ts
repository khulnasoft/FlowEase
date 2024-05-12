import { render, screen } from '@testing-library/vue';
import FloweaseBlockUi from '../BlockUi.vue';

describe('components', () => {
	describe('FloweaseBlockUi', () => {
		it('should render but not visible', () => {
			render(FloweaseBlockUi);
			expect(screen.queryByRole('dialog', { hidden: true })).not.toBeVisible();
		});

		it('should render and is visible', () => {
			render(FloweaseBlockUi, { props: { show: true } });
			expect(screen.getByRole('dialog', { hidden: true })).toBeVisible();
		});
	});
});
