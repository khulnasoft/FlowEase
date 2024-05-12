<template>
	<span>
		<flowease-tooltip content=" " placement="top">
			<template #content>
				<slot />
			</template>
			<font-awesome-icon :class="$style['icon']" icon="exclamation-triangle"></font-awesome-icon>
		</flowease-tooltip>
	</span>
</template>

<style lang="scss" module>
.icon {
	font-size: 14px;
	height: 18px;
	color: $warning-tooltip-color;
}
</style>
