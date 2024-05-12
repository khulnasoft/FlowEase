<template>
	<div :class="$style.container">
		<font-awesome-icon icon="exclamation-triangle" :class="$style.icon" />
		<div :class="$style.message">
			<div>
				<flowease-heading size="2xlarge">
					{{ $locale.baseText(messageKey) }}
				</flowease-heading>
			</div>
			<div>
				<flowease-text v-if="errorCode" size="large">
					{{ errorCode }} {{ $locale.baseText('error') }}
				</flowease-text>
			</div>
		</div>
		<flowease-button :label="$locale.baseText(redirectTextKey)" @click="onButtonClick" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ErrorView',
	props: {
		messageKey: {
			type: String,
			required: true,
		},
		errorCode: {
			type: Number,
		},
		redirectTextKey: {
			type: String,
		},
		redirectPage: {
			type: String,
		},
	},
	methods: {
		onButtonClick() {
			void this.$router.push({ name: this.redirectPage });
		},
	},
});
</script>

<style lang="scss" module>
.container {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.icon {
	min-height: 96px;
	min-width: 108px;
	margin-bottom: var(--spacing-2xl);
	color: var(--color-foreground-base);
}

.message {
	margin-bottom: var(--spacing-l);

	* {
		margin-bottom: var(--spacing-2xs);
		display: flex;
		justify-content: center;
	}
}
</style>
