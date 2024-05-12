<template>
	<ElTooltip v-bind="{ ...$props, ...$attrs }" :popper-class="$props.popperClass ?? 'flowease-tooltip'">
		<slot />
		<template #content>
			<slot name="content">
				<div v-html="content"></div>
			</slot>
			<div
				v-if="buttons.length"
				:class="$style.buttons"
				:style="{ justifyContent: justifyButtons }"
			>
				<FloweaseButton
					v-for="button in buttons"
					:key="button.attrs.label"
					v-bind="{ ...button.attrs, ...button.listeners }"
				/>
			</div>
		</template>
	</ElTooltip>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { ElTooltip } from 'element-plus';
import type { IFloweaseButton } from '@/types';
import FloweaseButton from '../FloweaseButton';

export default defineComponent({
	name: 'FloweaseTooltip',
	components: {
		ElTooltip,
		FloweaseButton,
	},
	inheritAttrs: false,
	props: {
		...ElTooltip.props,
		content: {
			type: String,
			default: '',
		},
		justifyButtons: {
			type: String,
			default: 'flex-end',
			validator: (value: string): boolean =>
				[
					'flex-start',
					'flex-end',
					'start',
					'end',
					'left',
					'right',
					'center',
					'space-between',
					'space-around',
					'space-evenly',
				].includes(value),
		},
		buttons: {
			type: Array as PropType<IFloweaseButton[]>,
			default: () => [],
		},
	},
});
</script>

<style lang="scss" module>
.buttons {
	display: flex;
	align-items: center;
	margin-top: var(--spacing-s);
	gap: var(--spacing-2xs);
}
</style>
