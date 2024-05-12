<template>
	<div :class="$style.container">
		<el-row v-if="currentCredential">
			<el-col :span="8" :class="$style.label">
				<flowease-text :compact="true" :bold="true">
					{{ $locale.baseText('credentialEdit.credentialInfo.created') }}
				</flowease-text>
			</el-col>
			<el-col :span="16" :class="$style.valueLabel">
				<flowease-text :compact="true"
					><TimeAgo :date="currentCredential.createdAt" :capitalize="true"
				/></flowease-text>
			</el-col>
		</el-row>
		<el-row v-if="currentCredential">
			<el-col :span="8" :class="$style.label">
				<flowease-text :compact="true" :bold="true">
					{{ $locale.baseText('credentialEdit.credentialInfo.lastModified') }}
				</flowease-text>
			</el-col>
			<el-col :span="16" :class="$style.valueLabel">
				<flowease-text :compact="true"
					><TimeAgo :date="currentCredential.updatedAt" :capitalize="true"
				/></flowease-text>
			</el-col>
		</el-row>
		<el-row v-if="currentCredential">
			<el-col :span="8" :class="$style.label">
				<flowease-text :compact="true" :bold="true">
					{{ $locale.baseText('credentialEdit.credentialInfo.id') }}
				</flowease-text>
			</el-col>
			<el-col :span="16" :class="$style.valueLabel">
				<flowease-text :compact="true">{{ currentCredential.id }}</flowease-text>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TimeAgo from '../TimeAgo.vue';
import type { INodeTypeDescription } from 'flowease-workflow';

export default defineComponent({
	name: 'CredentialInfo',
	components: {
		TimeAgo,
	},
	props: ['currentCredential', 'credentialPermissions'],
	methods: {
		shortNodeType(nodeType: INodeTypeDescription) {
			return this.$locale.shortNodeType(nodeType.name);
		},
	},
});
</script>

<style lang="scss" module>
.container {
	> * {
		margin-bottom: var(--spacing-l);
	}
}

.label {
	font-weight: var(--font-weight-bold);
	max-width: 230px;
}

.accessLabel {
	composes: label;
	margin-top: var(--spacing-5xs);
}

.valueLabel {
	font-weight: var(--font-weight-regular);
}
</style>
