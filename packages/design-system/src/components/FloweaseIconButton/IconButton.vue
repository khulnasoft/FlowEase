<template>
	<FloweaseButton square v-bind="{ ...$attrs, ...$props }" />
</template>

<script lang="ts" setup>
import type { IconButtonProps } from '@/types/button';
import FloweaseButton from '../FloweaseButton';

defineOptions({ name: 'FloweaseIconButton' });
withDefaults(defineProps<IconButtonProps>(), {
	type: 'primary',
	size: 'medium',
	loading: false,
	outline: false,
	text: false,
	disabled: false,
	active: false,
});
</script>
