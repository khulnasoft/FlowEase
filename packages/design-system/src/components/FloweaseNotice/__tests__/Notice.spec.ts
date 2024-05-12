import { render } from '@testing-library/vue';
import FloweaseNotice from '../Notice.vue';
import { FloweaseText } from '@/components';

describe('components', () => {
	describe('FloweaseNotice', () => {
		it('should render correctly', () => {
			const wrapper = render(FloweaseNotice, {
				props: {
					id: 'notice',
				},
				slots: {
					default: 'This is a notice.',
				},
				global: {
					stubs: ['flowease-text'],
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});

		describe('props', () => {
			describe('content', () => {
				it('should render correctly with content prop', () => {
					const wrapper = render(FloweaseNotice, {
						props: {
							id: 'notice',
							content: 'This is a notice.',
						},
						global: {
							stubs: ['flowease-text'],
						},
					});
					expect(wrapper.html()).toMatchSnapshot();
				});

				it('should render HTML', () => {
					const wrapper = render(FloweaseNotice, {
						props: {
							id: 'notice',
							content: '<strong>Hello world!</strong> This is a notice.',
						},
						global: {
							components: {
								'flowease-text': FloweaseText,
							},
						},
					});

					expect(wrapper.container.querySelectorAll('strong')).toHaveLength(1);
					expect(wrapper.html()).toMatchSnapshot();
				});

				it('should sanitize rendered HTML', () => {
					const wrapper = render(FloweaseNotice, {
						props: {
							id: 'notice',
							content: '<script>alert(1);</script> This is a notice.',
						},
						global: {
							stubs: ['flowease-text'],
						},
					});

					expect(wrapper.container.querySelector('script')).not.toBeTruthy();
					expect(wrapper.html()).toMatchSnapshot();
				});
			});
		});
	});
});
