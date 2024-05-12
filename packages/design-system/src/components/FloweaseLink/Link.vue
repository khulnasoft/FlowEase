<template>
	<FloweaseRoute :to="to" :new-window="newWindow" v-bind="$attrs" class="flowease-link">
		<span :class="$style[`${underline ? `${theme}-underline` : theme}`]">
			<FloweaseText :size="size" :bold="bold">
				<slot></slot>
			</FloweaseText>
		</span>
	</FloweaseRoute>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';
import FloweaseText from '../FloweaseText';
import FloweaseRoute from '../FloweaseRoute';
import type { TextSize } from '@/types/text';

const THEME = ['primary', 'danger', 'text', 'secondary'] as const;

interface LinkProps {
	to?: RouteLocationRaw;
	size?: TextSize;
	newWindow?: boolean;
	bold?: boolean;
	underline?: boolean;
	theme?: (typeof THEME)[number];
}

defineOptions({ name: 'FloweaseLink' });
withDefaults(defineProps<LinkProps>(), {
	bold: false,
	underline: false,
	theme: 'primary',
});
</script>

<style lang="scss" module>
@import '../../utils';
@import '../../css/common/var';

.primary {
	color: $link-color;

	&:active {
		color: $link-color-active;
	}
}

.text {
	color: var(--color-text-base);

	&:hover {
		color: $link-color;
	}

	&:active {
		color: $link-color-active;
	}
}

.danger {
	color: var(--color-danger);

	&:active {
		color: var(--color-danger-shade-1);
	}
}

.secondary {
	color: var(--color-secondary-link);

	&:active {
		color: var(--color-secondary-link-hover);
	}
}

.primary-underline {
	composes: primary;
	text-decoration: underline;
}

.text-underline {
	composes: text;
	text-decoration: underline;
}

.danger-underline {
	composes: danger;
	text-decoration: underline;
}

.secondary-underline {
	composes: secondary;
	text-decoration: underline;
}
</style>
