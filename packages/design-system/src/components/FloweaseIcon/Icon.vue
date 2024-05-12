<template>
	<FloweaseText :size="size" :color="color" :compact="true" class="flowease-icon" v-bind="$attrs">
		<FontAwesomeIcon :icon="icon" :spin="spin" :class="$style[size]" />
	</FloweaseText>
</template>

<script lang="ts" setup>
import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { IconSize, IconColor } from '@/types/icon';
import FloweaseText from '../FloweaseText';

interface IconProps {
	icon: FontAwesomeIconProps['icon'];
	size?: IconSize;
	spin?: FontAwesomeIconProps['spin'];
	color?: IconColor;
}

defineOptions({ name: 'FloweaseIcon' });
withDefaults(defineProps<IconProps>(), {
	size: 'medium',
	spin: false,
});
</script>

<style lang="scss" module>
.xlarge {
	width: var(--font-size-xl) !important;
}

.large {
	width: var(--font-size-m) !important;
}

.medium {
	width: var(--font-size-s) !important;
}

.small {
	width: var(--font-size-2xs) !important;
}

.xsmall {
	width: var(--font-size-3xs) !important;
}
</style>
