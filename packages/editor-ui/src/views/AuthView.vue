<template>
	<div :class="$style.container">
		<div :class="$style.logoContainer">
			<Logo />
		</div>
		<div v-if="subtitle" :class="$style.textContainer">
			<flowease-text size="large">{{ subtitle }}</flowease-text>
		</div>
		<div :class="$style.formContainer">
			<flowease-form-box
				v-bind="form"
				data-test-id="auth-form"
				:button-loading="formLoading"
				@secondary-click="onSecondaryClick"
				@submit="onSubmit"
				@update="onUpdate"
			>
				<SSOLogin v-if="withSso" />
			</flowease-form-box>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Logo from '@/components/Logo.vue';
import SSOLogin from '@/components/SSOLogin.vue';

export default defineComponent({
	name: 'AuthView',
	components: {
		Logo,
		SSOLogin,
	},
	props: {
		form: {},
		formLoading: {
			type: Boolean,
			default: false,
		},
		subtitle: {
			type: String,
		},
		withSso: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		onUpdate(e: { name: string; value: string }) {
			this.$emit('update', e);
		},
		onSubmit(values: { [key: string]: string }) {
			this.$emit('submit', values);
		},
		onSecondaryClick() {
			this.$emit('secondaryClick');
		},
	},
});
</script>

<style lang="scss" module>
body {
	background-color: var(--color-background-light);
}

.container {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: var(--spacing-2xl);

	> * {
		margin-bottom: var(--spacing-l);
		width: 352px;
	}
}

.logoContainer {
	display: flex;
	justify-content: center;
}

.textContainer {
	text-align: center;
}

.formContainer {
	padding-bottom: var(--spacing-xl);
}
</style>

<style lang="scss">
.el-checkbox__label span {
	font-size: var(--font-size-2xs) !important;
}
</style>
