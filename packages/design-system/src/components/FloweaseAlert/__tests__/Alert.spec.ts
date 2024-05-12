import { render, screen } from '@testing-library/vue';
import FloweaseAlert from '../Alert.vue';
import FloweaseIcon from '../../FloweaseIcon';

describe('components', () => {
	describe('FloweaseAlert', () => {
		it('should render with props', () => {
			render(FloweaseAlert, {
				props: { title: 'Title', description: 'Message' },
			});
			expect(screen.getByRole('alert')).toBeVisible();
			expect(screen.getByText('Title')).toBeVisible();
			expect(screen.getByText('Message')).toBeVisible();
		});

		it('should render slots instead of props', () => {
			const { container } = render(FloweaseAlert, {
				props: { showIcon: false },
				slots: {
					title: 'Title',
					default: 'Message',
					aside: '<button>Click me</button>',
					icon: '<flowease-icon icon="plus-circle" />',
				},
				global: {
					components: {
						'flowease-icon': FloweaseIcon,
					},
				},
			});
			expect(screen.getByRole('alert')).toBeVisible();
			expect(screen.getByText('Title')).toBeVisible();
			expect(screen.getByText('Message')).toBeVisible();
			expect(screen.getByRole('button')).toBeVisible();
			expect(container.querySelector('.flowease-icon')).toBeInTheDocument();
		});
	});
});
