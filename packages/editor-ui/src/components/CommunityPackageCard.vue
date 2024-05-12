<template>
	<div :class="$style.cardContainer">
		<div v-if="loading" :class="$style.cardSkeleton">
			<flowease-loading :class="$style.loader" variant="p" :rows="1" />
			<flowease-loading :class="$style.loader" variant="p" :rows="1" />
		</div>
		<div v-else :class="$style.packageCard">
			<div :class="$style.cardInfoContainer">
				<div :class="$style.cardTitle">
					<flowease-text :bold="true" size="large">{{
						communityPackage.packageName
					}}</flowease-text>
				</div>
				<div :class="$style.cardSubtitle">
					<flowease-text :bold="true" size="small" color="text-light">
						{{
							$locale.baseText('settings.communityNodes.packageNodes.label', {
								adjustToNumber: communityPackage.installedNodes.length,
							})
						}}:&nbsp;
					</flowease-text>
					<flowease-text size="small" color="text-light">
						<span v-for="(node, index) in communityPackage.installedNodes" :key="node.name">
							{{ node.name
							}}<span v-if="index != communityPackage.installedNodes.length - 1">,</span>
						</span>
					</flowease-text>
				</div>
			</div>
			<div :class="$style.cardControlsContainer">
				<flowease-text :bold="true" size="large" color="text-light">
					v{{ communityPackage.installedVersion }}
				</flowease-text>
				<flowease-tooltip v-if="communityPackage.failedLoading === true" placement="top">
					<template #content>
						<div>
							{{ $locale.baseText('settings.communityNodes.failedToLoad.tooltip') }}
						</div>
					</template>
					<flowease-icon icon="exclamation-triangle" color="danger" size="large" />
				</flowease-tooltip>
				<flowease-tooltip v-else-if="communityPackage.updateAvailable" placement="top">
					<template #content>
						<div>
							{{ $locale.baseText('settings.communityNodes.updateAvailable.tooltip') }}
						</div>
					</template>
					<flowease-button outline label="Update" @click="onUpdateClick" />
				</flowease-tooltip>
				<flowease-tooltip v-else placement="top">
					<template #content>
						<div>
							{{ $locale.baseText('settings.communityNodes.upToDate.tooltip') }}
						</div>
					</template>
					<flowease-icon icon="check-circle" color="text-light" size="large" />
				</flowease-tooltip>
				<div :class="$style.cardActions">
					<flowease-action-toggle
						:actions="packageActions"
						@action="onAction"
					></flowease-action-toggle>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useUIStore } from '@/stores/ui.store';
import type { PublicInstalledPackage } from 'flowease-workflow';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { NPM_PACKAGE_DOCS_BASE_URL, COMMUNITY_PACKAGE_MANAGE_ACTIONS } from '@/constants';

export default defineComponent({
	name: 'CommunityPackageCard',
	props: {
		communityPackage: {
			type: Object as () => PublicInstalledPackage,
		},
		loading: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			packageActions: [
				{
					label: this.$locale.baseText('settings.communityNodes.viewDocsAction.label'),
					value: COMMUNITY_PACKAGE_MANAGE_ACTIONS.VIEW_DOCS,
					type: 'external-link',
				},
				{
					label: this.$locale.baseText('settings.communityNodes.uninstallAction.label'),
					value: COMMUNITY_PACKAGE_MANAGE_ACTIONS.UNINSTALL,
				},
			],
		};
	},
	computed: {
		...mapStores(useUIStore),
	},
	methods: {
		async onAction(value: string) {
			switch (value) {
				case COMMUNITY_PACKAGE_MANAGE_ACTIONS.VIEW_DOCS:
					this.$telemetry.track('user clicked to browse the cnr package documentation', {
						package_name: this.communityPackage.packageName,
						package_version: this.communityPackage.installedVersion,
					});
					window.open(`${NPM_PACKAGE_DOCS_BASE_URL}${this.communityPackage.packageName}`, '_blank');
					break;
				case COMMUNITY_PACKAGE_MANAGE_ACTIONS.UNINSTALL:
					this.uiStore.openCommunityPackageUninstallConfirmModal(this.communityPackage.packageName);
					break;
				default:
					break;
			}
		},
		onUpdateClick() {
			this.uiStore.openCommunityPackageUpdateConfirmModal(this.communityPackage.packageName);
		},
	},
});
</script>

<style lang="scss" module>
.cardContainer {
	display: flex;
	padding: var(--spacing-s);
	border: var(--border-width-base) var(--border-style-base) var(--color-info-tint-1);
	border-radius: var(--border-radius-large);
	background-color: var(--color-background-xlight);
}

.packageCard,
.cardSkeleton {
	display: flex;
	flex-basis: 100%;
	justify-content: space-between;
}

.packageCard {
	align-items: center;
}

.cardSkeleton {
	flex-direction: column;
}

.loader {
	width: 50%;
	transform: scaleY(-1);

	&:last-child {
		width: 70%;

		div {
			margin: 0;
		}
	}
}

.cardInfoContainer {
	display: flex;
	flex-wrap: wrap;
}

.cardTitle {
	flex-basis: 100%;

	span {
		line-height: 1;
	}
}

.cardSubtitle {
	margin-top: 2px;
	padding-right: var(--spacing-m);
}

.cardControlsContainer {
	display: flex;
	align-items: center;
	gap: var(--spacing-3xs);
}

.cardActions {
	padding-left: var(--spacing-3xs);
}
</style>
