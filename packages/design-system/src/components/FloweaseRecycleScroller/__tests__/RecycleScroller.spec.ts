import { render } from '@testing-library/vue';
import FloweaseRecycleScroller from '../RecycleScroller.vue';

const itemSize = 100;
const itemKey = 'id';
const items = [...(new Array(100) as number[])].map((_, index) => ({
	id: index,
	name: `Item ${index}`,
}));

describe('components', () => {
	describe('FloweaseRecycleScroller', () => {
		it('should render correctly', () => {
			const wrapper = render(FloweaseRecycleScroller, {
				props: {
					itemSize,
					itemKey,
					items,
				},
			});

			expect(wrapper.container.querySelector('.recycle-scroller')).toHaveStyle(
				`height: ${itemSize * items.length}px`,
			);
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
