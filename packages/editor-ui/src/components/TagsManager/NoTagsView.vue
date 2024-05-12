<template>
	<div :class="$style.container">
		<el-col class="notags" :span="16">
			<div class="icon">🗄️</div>
			<div>
				<div class="mb-s">
					<flowease-heading size="large">
						{{ $locale.baseText('noTagsView.readyToOrganizeYourWorkflows') }}
					</flowease-heading>
				</div>
				<div class="description">
					{{ $locale.baseText('noTagsView.withWorkflowTagsYouReFree') }}
				</div>
			</div>
			<flowease-button label="Create a tag" size="large" @click="$emit('enableCreate')" />
		</el-col>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'NoTagsView',
});
</script>

<style lang="scss" module>
$--footer-spacing: 45px;

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: $--footer-spacing;
}
</style>

<style lang="scss" scoped>
.notags {
	word-break: normal;
	text-align: center;

	> * {
		margin-bottom: 32px;
	}
}

.icon {
	font-size: 36px;
	line-height: 14px;
}

.description {
	font-size: 14px;
	line-height: 21px;
}
</style>
