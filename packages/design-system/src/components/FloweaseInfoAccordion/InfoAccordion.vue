<template>
	<div :class="['accordion', $style.container]">
		<div :class="{ [$style.header]: true, [$style.expanded]: expanded }" @click="toggle">
			<FloweaseIcon
				v-if="headerIcon"
				:icon="headerIcon.icon"
				:color="headerIcon.color"
				size="small"
				class="mr-2xs"
			/>
			<FloweaseText :class="$style.headerText" color="text-base" size="small" align="left" bold>{{
				title
			}}</FloweaseText>
			<FloweaseIcon :icon="expanded ? 'chevron-up' : 'chevron-down'" bold />
		</div>
		<div
			v-if="expanded"
			:class="{ [$style.description]: true, [$style.collapsed]: !expanded }"
			@click="onClick"
		>
			<!-- Info accordion can display list of items with icons or just a HTML description -->
			<div v-if="items.length > 0" :class="$style.accordionItems">
				<div v-for="item in items" :key="item.id" :class="$style.accordionItem">
					<flowease-tooltip :disabled="!item.tooltip">
						<template #content>
							<div @click="onTooltipClick(item.id, $event)" v-html="item.tooltip"></div>
						</template>
						<FloweaseIcon :icon="item.icon" :color="item.iconColor" size="small" class="mr-2xs" />
					</flowease-tooltip>
					<FloweaseText size="small" color="text-base">{{ item.label }}</FloweaseText>
				</div>
			</div>
			<FloweaseText color="text-base" size="small" align="left">
				<span v-html="description"></span>
			</FloweaseText>
			<slot name="customContent"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import FloweaseText from '../FloweaseText';
import FloweaseIcon from '../FloweaseIcon';
import type { IconColor } from '@/types/icon';
import { createEventBus, type EventBus } from '../../utils';

interface IAccordionItem {
	id: string;
	label: string;
	icon: string;
	iconColor?: IconColor;
	tooltip?: string;
}

interface InfoAccordionProps {
	title?: string;
	description?: string;
	items?: IAccordionItem[];
	initiallyExpanded?: boolean;
	headerIcon?: { icon: string; color: IconColor };
	eventBus?: EventBus;
}

defineOptions({ name: 'FloweaseInfoAccordion' });
const props = withDefaults(defineProps<InfoAccordionProps>(), {
	items: () => [],
	initiallyExpanded: false,
	eventBus: () => createEventBus(),
});
const $emit = defineEmits(['click:body', 'tooltipClick']);

const expanded = ref(false);
onMounted(() => {
	props.eventBus.on('expand', () => {
		expanded.value = true;
	});
	expanded.value = props.initiallyExpanded;
});

const toggle = () => {
	expanded.value = !expanded.value;
};

const onClick = (e: MouseEvent) => $emit('click:body', e);

const onTooltipClick = (item: string, event: MouseEvent) => $emit('tooltipClick', item, event);
</script>

<style lang="scss" module>
.container {
	background-color: var(--color-background-base);
}

.header {
	cursor: pointer;
	display: flex;
	padding: var(--spacing-s);
	align-items: center;

	.headerText {
		flex-grow: 1;
	}
}

.expanded {
	padding: var(--spacing-s) var(--spacing-s) var(--spacing-2xs) var(--spacing-s);
}

.accordionItems {
	display: flex;
	flex-direction: column !important;
	align-items: flex-start !important;
	width: 100%;
}

.accordionItem {
	display: block !important;
	text-align: left;
}

.description {
	display: flex;
	padding: 0 var(--spacing-s) var(--spacing-s) var(--spacing-s);

	b {
		font-weight: var(--font-weight-bold);
	}
}
</style>
