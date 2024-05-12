<script setup lang="ts">
import type { Placement } from 'element-plus';
import type { KeyboardShortcut } from 'flowease-design-system/src/components/FloweaseKeyboardShortcut';

interface Props {
	label: string;
	shortcut: KeyboardShortcut;
	placement?: Placement;
}
withDefaults(defineProps<Props>(), { placement: 'top' });
</script>

<template>
	<flowease-tooltip :placement="placement" :show-after="500">
		<template #content>
			<div :class="$style.shortcut">
				<div :class="$style.label">{{ label }}</div>
				<flowease-keyboard-shortcut v-bind="shortcut"></flowease-keyboard-shortcut>
			</div>
		</template>
		<slot />
	</flowease-tooltip>
</template>

<style lang="scss" module>
.shortcut {
	display: flex;
	align-items: center;
	font-size: var(--font-size-2xs);
	gap: var(--spacing-2xs);
}

.label {
	flex-shrink: 0;
}
</style>
