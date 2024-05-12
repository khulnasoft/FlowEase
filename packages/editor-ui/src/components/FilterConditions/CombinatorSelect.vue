<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';
import type { FilterTypeCombinator } from 'flowease-workflow';

interface Props {
	options: FilterTypeCombinator[];
	selected: FilterTypeCombinator;
	readOnly: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
	(event: 'combinatorChange', value: FilterTypeCombinator): void;
}>();

const i18n = useI18n();

const onCombinatorChange = (combinator: FilterTypeCombinator): void => {
	emit('combinatorChange', combinator);
};
</script>

<template>
	<div data-test-id="filter-combinator-select" :class="$style.combinatorSelect">
		<div v-if="readOnly || options.length === 1">
			{{ i18n.baseText(`filter.combinator.${selected}`) }}
		</div>
		<flowease-select
			v-else
			size="small"
			:model-value="selected"
			@update:model-value="onCombinatorChange"
		>
			<flowease-option
				v-for="option in options"
				:key="option"
				:value="option"
				:label="i18n.baseText(`filter.combinator.${option}`)"
			>
			</flowease-option>
		</flowease-select>
	</div>
</template>

<style lang="scss" module>
.combinatorSelect {
	max-width: 80px;
	line-height: var(--font-line-height-xloose);
	font-size: var(--font-size-2xs);
	color: var(--color-text-light);
}
</style>
