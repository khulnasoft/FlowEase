import { render } from '@testing-library/vue';
import FLOWEASEActionBox from '../ActionBox.vue';

describe('FLOWEASEActionBox', () => {
	it('should render correctly', () => {
		const wrapper = render(FLOWEASEActionBox, {
			props: {
				emoji: '😿',
				heading: 'Headline you need to know',
				description:
					'Long description that you should know something is the way it is because of how it is. ',
				buttonText: 'Do something',
			},
			global: {
				stubs: ['flowease-heading', 'flowease-text', 'flowease-button', 'flowease-callout'],
			},
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
