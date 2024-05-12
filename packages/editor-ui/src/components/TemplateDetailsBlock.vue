<template>
	<div :class="$style.block">
		<div :class="$style.header">
			<flowease-heading tag="h3" size="small" color="text-base">{{ title }}</flowease-heading>
		</div>
		<div :class="$style.content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TemplateDetailsBlock',
	props: {
		title: {
			type: String,
		},
	},
});
</script>

<style lang="scss" module>
.block {
	padding-bottom: var(--spacing-xl);
}

.header {
	padding: 0 0 var(--spacing-4xs);
	border-bottom: var(--border-base);
}

.content {
	padding: var(--spacing-xs) 0 0;
}
</style>
