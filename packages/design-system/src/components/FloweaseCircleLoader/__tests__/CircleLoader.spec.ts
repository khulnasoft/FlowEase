import { render } from '@testing-library/vue';
import FLOWEASECircleLoader from '../CircleLoader.vue';

describe('FLOWEASECircleLoader', () => {
	it('should render correctly', () => {
		const wrapper = render(FLOWEASECircleLoader, {
			props: {
				radius: 20,
				progress: 42,
				strokeWidth: 10,
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
