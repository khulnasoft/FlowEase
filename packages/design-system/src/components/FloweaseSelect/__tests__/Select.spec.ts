import { defineComponent, ref } from 'vue';
import { render, waitFor, within } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import FloweaseSelect from '../Select.vue';
import FloweaseOption from '../../FloweaseOption/Option.vue';

describe('components', () => {
	describe('FloweaseSelect', () => {
		it('should render correctly', () => {
			const wrapper = render(FloweaseSelect, {
				global: {
					components: {
						'flowease-option': FloweaseOption,
					},
				},
				slots: {
					default: [
						'<flowease-option value="1">1</flowease-option>',
						'<flowease-option value="2">2</flowease-option>',
						'<flowease-option value="3">3</flowease-option>',
					],
				},
			});
			expect(wrapper.html()).toMatchSnapshot();
		});

		it('should select an option', async () => {
			const floweaseSelectTestComponent = defineComponent({
				setup() {
					const options = ref(['1', '2', '3']);
					const selected = ref('');

					return {
						options,
						selected,
					};
				},
				template: `
					<flowease-select v-model="selected">
						<flowease-option v-for="o in options" :key="o" :value="o" :label="o" />
					</flowease-select>
				`,
			});

			const { container } = render(floweaseSelectTestComponent, {
				props: {
					teleported: false,
				},
				global: {
					components: {
						'flowease-select': FloweaseSelect,
						'flowease-option': FloweaseOption,
					},
				},
			});
			const getOption = (value: string) => within(container as HTMLElement).getByText(value);

			const textbox = container.querySelector('input')!;
			await userEvent.click(textbox);
			await waitFor(() => expect(getOption('1')).toBeVisible());
			await userEvent.click(getOption('1'));

			expect(textbox).toHaveValue('1');
		});
	});
});
