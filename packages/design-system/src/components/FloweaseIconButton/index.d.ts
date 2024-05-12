import { FloweaseComponent, FloweaseComponentSize } from '../component';
import { ButtonTheme, ButtonType } from '../FloweaseButton';

/** Icon Button Component */
export declare class FloweaseIconButton extends FloweaseComponent {
	/** Button type */
	type: ButtonType;

	/** Button title on hover */
	title: string;

	/** Button size */
	size: FloweaseComponentSize | 'xlarge';

	/** Determine whether it's loading */
	loading: boolean;

	/** Disable the button */
	disabled: boolean;

	/** Button icon, accepts an icon name of font awesome icon component */
	icon: string;

	/** Button theme */
	theme: ButtonTheme;
}
