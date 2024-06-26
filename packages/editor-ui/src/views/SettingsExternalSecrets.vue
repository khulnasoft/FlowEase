<script lang="ts" setup>
import { useUIStore } from '@/stores/ui.store';
import { useI18n } from '@/composables/useI18n';
import { useToast } from '@/composables/useToast';
import { useExternalSecretsStore } from '@/stores/externalSecrets.ee.store';
import { computed, onMounted } from 'vue';
import ExternalSecretsProviderCard from '@/components/ExternalSecretsProviderCard.ee.vue';
import type { ExternalSecretsProvider } from '@/Interface';

const i18n = useI18n();
const uiStore = useUIStore();
const externalSecretsStore = useExternalSecretsStore();
const toast = useToast();

const sortedProviders = computed(() => {
	return ([...externalSecretsStore.providers] as ExternalSecretsProvider[]).sort((a, b) => {
		return b.name.localeCompare(a.name);
	});
});

onMounted(() => {
	if (!externalSecretsStore.isEnterpriseExternalSecretsEnabled) return;
	try {
		void externalSecretsStore.fetchAllSecrets();
		void externalSecretsStore.getProviders();
	} catch (error) {
		toast.showError(error, i18n.baseText('error'));
	}
});

function goToUpgrade() {
	void uiStore.goToUpgrade('external-secrets', 'upgrade-external-secrets');
}
</script>

<template>
	<div class="pb-3xl">
		<flowease-heading size="2xlarge">{{
			i18n.baseText('settings.externalSecrets.title')
		}}</flowease-heading>
		<div
			v-if="externalSecretsStore.isEnterpriseExternalSecretsEnabled"
			data-test-id="external-secrets-content-licensed"
		>
			<flowease-callout theme="secondary" class="mt-2xl mb-l">
				{{ i18n.baseText('settings.externalSecrets.info') }}
				<a :href="i18n.baseText('settings.externalSecrets.docs')" target="_blank">
					{{ i18n.baseText('settings.externalSecrets.info.link') }}
				</a>
			</flowease-callout>
			<ExternalSecretsProviderCard
				v-for="provider in sortedProviders"
				:key="provider.name"
				:provider="provider"
			/>
		</div>
		<flowease-action-box
			v-else
			class="mt-2xl mb-l"
			data-test-id="external-secrets-content-unlicensed"
			:button-text="i18n.baseText('settings.externalSecrets.actionBox.buttonText')"
			@click="goToUpgrade"
		>
			<template #heading>
				<span>{{ i18n.baseText('settings.externalSecrets.actionBox.title') }}</span>
			</template>
			<template #description>
				<i18n-t keypath="settings.externalSecrets.actionBox.description">
					<template #link>
						<a :href="i18n.baseText('settings.externalSecrets.docs')" target="_blank">
							{{ i18n.baseText('settings.externalSecrets.actionBox.description.link') }}
						</a>
					</template>
				</i18n-t>
			</template>
		</flowease-action-box>
	</div>
</template>
