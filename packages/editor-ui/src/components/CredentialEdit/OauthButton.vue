<template>
	<div :class="$style.container">
		<GoogleAuthButton v-if="isGoogleOAuthType" />
		<flowease-button
			v-else
			:label="$locale.baseText('credentialEdit.oAuthButton.connectMyAccount')"
			size="large"
		/>
	</div>
</template>

<script lang="ts" setup>
import GoogleAuthButton from './GoogleAuthButton.vue';

defineProps<{
	isGoogleOAuthType: boolean;
}>();
</script>

<style module lang="scss">
.container {
	display: inline-block;
}
</style>
