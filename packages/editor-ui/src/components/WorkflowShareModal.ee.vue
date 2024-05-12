<template>
	<Modal
		width="460px"
		max-height="75%"
		:title="modalTitle"
		:event-bus="modalBus"
		:name="WORKFLOW_SHARE_MODAL_KEY"
		:center="true"
		:before-close="onCloseModal"
	>
		<template #content>
			<div v-if="!isSharingEnabled" :class="$style.container">
				<flowease-text>
					{{
						$locale.baseText(
							uiStore.contextBasedTranslationKeys.workflows.sharing.unavailable.description.modal,
						)
					}}
				</flowease-text>
			</div>
			<div v-else-if="isDefaultUser" :class="$style.container">
				<flowease-text>
					{{ $locale.baseText('workflows.shareModal.isDefaultUser.description') }}
				</flowease-text>
			</div>
			<div v-else :class="$style.container">
				<flowease-info-tip v-if="!workflowPermissions.updateSharing" :bold="false" class="mb-s">
					{{
						$locale.baseText('workflows.shareModal.info.sharee', {
							interpolate: { workflowOwnerName },
						})
					}}
				</flowease-info-tip>
				<enterprise-edition :features="[EnterpriseEditionFeature.Sharing]" :class="$style.content">
					<flowease-user-select
						v-if="workflowPermissions.updateSharing"
						class="mb-s"
						size="large"
						:users="usersList"
						:current-user-id="currentUser.id"
						:placeholder="$locale.baseText('workflows.shareModal.select.placeholder')"
						data-test-id="workflow-sharing-modal-users-select"
						@update:model-value="onAddSharee"
					>
						<template #prefix>
							<flowease-icon icon="search" />
						</template>
					</flowease-user-select>
					<flowease-users-list
						:actions="[]"
						:users="sharedWithList"
						:current-user-id="currentUser.id"
						:delete-label="$locale.baseText('workflows.shareModal.list.delete')"
						:readonly="!workflowPermissions.updateSharing"
						:class="$style.usersList"
					>
						<template #actions="{ user }">
							<flowease-select
								:class="$style.roleSelect"
								model-value="editor"
								size="small"
								@update:model-value="onRoleAction(user, $event)"
							>
								<flowease-option
									:label="$locale.baseText('workflows.roles.editor')"
									value="editor"
								/>
								<flowease-option :class="$style.roleSelectRemoveOption" value="remove">
									<flowease-text color="danger">{{
										$locale.baseText('workflows.shareModal.list.delete')
									}}</flowease-text>
								</flowease-option>
							</flowease-select>
						</template>
					</flowease-users-list>
					<template #fallback>
						<flowease-text>
							<i18n-t
								:keypath="
									uiStore.contextBasedTranslationKeys.workflows.sharing.unavailable.description
								"
								tag="span"
							>
								<template #action />
							</i18n-t>
						</flowease-text>
					</template>
				</enterprise-edition>
			</div>
		</template>

		<template #footer>
			<div v-if="!isSharingEnabled" :class="$style.actionButtons">
				<flowease-button @click="goToUpgrade">
					{{
						$locale.baseText(
							uiStore.contextBasedTranslationKeys.workflows.sharing.unavailable.button,
						)
					}}
				</flowease-button>
			</div>
			<div v-else-if="isDefaultUser" :class="$style.actionButtons">
				<flowease-button @click="goToUsersSettings">
					{{ $locale.baseText('workflows.shareModal.isDefaultUser.button') }}
				</flowease-button>
			</div>
			<enterprise-edition
				v-else
				:features="[EnterpriseEditionFeature.Sharing]"
				:class="$style.actionButtons"
			>
				<flowease-text v-show="isDirty" color="text-light" size="small" class="mr-xs">
					{{ $locale.baseText('workflows.shareModal.changesHint') }}
				</flowease-text>
				<flowease-button
					v-show="workflowPermissions.updateSharing"
					:loading="loading"
					:disabled="!isDirty"
					data-test-id="workflow-sharing-modal-save-button"
					@click="onSave"
				>
					{{ $locale.baseText('workflows.shareModal.save') }}
				</flowease-button>
			</enterprise-edition>
		</template>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { createEventBus } from 'flowease-design-system/utils';

import Modal from './Modal.vue';
import {
	EnterpriseEditionFeature,
	MODAL_CONFIRM,
	PLACEHOLDER_EMPTY_WORKFLOW_ID,
	VIEWS,
	WORKFLOW_SHARE_MODAL_KEY,
} from '@/constants';
import type { IUser, IWorkflowDb } from '@/Interface';
import type { IPermissions } from '@/permissions';
import { getWorkflowPermissions } from '@/permissions';
import { useMessage } from '@/composables/useMessage';
import { useToast } from '@/composables/useToast';
import { nodeViewEventBus } from '@/event-bus';
import { useSettingsStore } from '@/stores/settings.store';
import { useUIStore } from '@/stores/ui.store';
import { useUsersStore } from '@/stores/users.store';
import { useWorkflowsStore } from '@/stores/workflows.store';
import { useWorkflowsEEStore } from '@/stores/workflows.ee.store';
import type { ITelemetryTrackProperties } from 'flowease-workflow';
import { useUsageStore } from '@/stores/usage.store';
import type { BaseTextKey } from '@/plugins/i18n';
import { isNavigationFailure } from 'vue-router';

export default defineComponent({
	name: 'WorkflowShareModal',
	components: {
		Modal,
	},
	props: {
		data: {
			type: Object,
			default: () => ({}),
		},
	},
	setup() {
		return {
			...useToast(),
			...useMessage(),
		};
	},
	data() {
		const workflowsStore = useWorkflowsStore();
		const workflow =
			this.data.id === PLACEHOLDER_EMPTY_WORKFLOW_ID
				? workflowsStore.workflow
				: workflowsStore.workflowsById[this.data.id];

		return {
			WORKFLOW_SHARE_MODAL_KEY,
			loading: true,
			modalBus: createEventBus(),
			sharedWith: [...(workflow.sharedWith || [])] as Array<Partial<IUser>>,
			EnterpriseEditionFeature,
		};
	},
	computed: {
		...mapStores(
			useSettingsStore,
			useUIStore,
			useUsersStore,
			useUsageStore,
			useWorkflowsStore,
			useWorkflowsEEStore,
		),
		isDefaultUser(): boolean {
			return this.usersStore.isDefaultUser;
		},
		isSharingEnabled(): boolean {
			return this.settingsStore.isEnterpriseFeatureEnabled(EnterpriseEditionFeature.Sharing);
		},
		modalTitle(): string {
			return this.$locale.baseText(
				this.isSharingEnabled
					? (this.uiStore.contextBasedTranslationKeys.workflows.sharing.title as BaseTextKey)
					: (this.uiStore.contextBasedTranslationKeys.workflows.sharing.unavailable
							.title as BaseTextKey),
				{
					interpolate: { name: this.workflow.name },
				},
			);
		},
		usersList(): IUser[] {
			return this.usersStore.allUsers.filter((user: IUser) => {
				const isAlreadySharedWithUser = (this.sharedWith || []).find(
					(sharee) => sharee.id === user.id,
				);
				const isOwner = this.workflow?.ownedBy?.id === user.id;

				return !isAlreadySharedWithUser && !isOwner;
			});
		},
		sharedWithList(): Array<Partial<IUser>> {
			return (
				[
					{
						...(this.workflow?.ownedBy ? this.workflow.ownedBy : this.usersStore.currentUser),
						isOwner: true,
					},
				] as Array<Partial<IUser>>
			).concat(this.sharedWith || []);
		},
		workflow(): IWorkflowDb {
			return this.data.id === PLACEHOLDER_EMPTY_WORKFLOW_ID
				? this.workflowsStore.workflow
				: this.workflowsStore.workflowsById[this.data.id];
		},
		currentUser(): IUser | null {
			return this.usersStore.currentUser;
		},
		workflowPermissions(): IPermissions {
			return getWorkflowPermissions(this.usersStore.currentUser, this.workflow);
		},
		workflowOwnerName(): string {
			return this.workflowsEEStore.getWorkflowOwnerName(`${this.workflow.id}`);
		},
		isDirty(): boolean {
			const previousSharedWith = this.workflow.sharedWith || [];

			return (
				this.sharedWith.length !== previousSharedWith.length ||
				this.sharedWith.some(
					(sharee) => !previousSharedWith.find((previousSharee) => sharee.id === previousSharee.id),
				)
			);
		},
	},
	watch: {
		workflow(workflow) {
			if (workflow.sharedWith) {
				this.sharedWith = workflow.sharedWith;
			}
		},
	},
	mounted() {
		void this.initialize();
	},
	methods: {
		async onSave() {
			if (this.loading) {
				return;
			}

			this.loading = true;

			const saveWorkflowPromise = async () => {
				return await new Promise<string>((resolve) => {
					if (this.workflow.id === PLACEHOLDER_EMPTY_WORKFLOW_ID) {
						nodeViewEventBus.emit('saveWorkflow', () => {
							resolve(this.workflow.id);
						});
					} else {
						resolve(this.workflow.id);
					}
				});
			};

			try {
				const shareesAdded = this.sharedWith.filter(
					(sharee) =>
						!this.workflow.sharedWith?.find((previousSharee) => sharee.id === previousSharee.id),
				);
				const shareesRemoved =
					this.workflow.sharedWith?.filter(
						(previousSharee) => !this.sharedWith.find((sharee) => sharee.id === previousSharee.id),
					) || [];

				const workflowId = await saveWorkflowPromise();
				await this.workflowsEEStore.saveWorkflowSharedWith({
					workflowId,
					sharedWith: this.sharedWith,
				});

				this.trackTelemetry({
					user_ids_sharees_added: shareesAdded.map((sharee) => sharee.id),
					sharees_removed: shareesRemoved.length,
				});

				this.showMessage({
					title: this.$locale.baseText('workflows.shareModal.onSave.success.title'),
					type: 'success',
				});
			} catch (error) {
				this.showError(error, this.$locale.baseText('workflows.shareModal.onSave.error.title'));
			} finally {
				this.modalBus.emit('close');
				this.loading = false;
			}
		},
		async onAddSharee(userId: string) {
			const { id, firstName, lastName, email } = this.usersStore.getUserById(userId)!;
			const sharee = { id, firstName, lastName, email };

			this.sharedWith = this.sharedWith.concat(sharee);

			this.trackTelemetry({
				user_id_sharee: userId,
			});
		},
		async onRemoveSharee(userId: string) {
			const user = this.usersStore.getUserById(userId)!;
			const isNewSharee = !(this.workflow.sharedWith || []).find((sharee) => sharee.id === userId);

			const isLastUserWithAccessToCredentialsById = (this.workflow.usedCredentials || []).reduce<
				Record<string, boolean>
			>((acc, credential) => {
				if (
					!credential.id ||
					!credential.ownedBy ||
					!credential.sharedWith ||
					!this.workflow.sharedWith
				) {
					return acc;
				}

				// if is credential owner, and no credential sharees have access to workflow  => NOT OK
				// if is credential owner, and credential sharees have access to workflow => OK

				// if is credential sharee, and no credential sharees have access to workflow or owner does not have access to workflow => NOT OK
				// if is credential sharee, and credential owner has access to workflow => OK
				// if is credential sharee, and other credential sharees have access to workflow => OK

				let isLastUserWithAccess = false;

				const isCredentialOwner = credential.ownedBy.id === user.id;
				const isCredentialSharee = !!credential.sharedWith.find((sharee) => sharee.id === user.id);

				if (isCredentialOwner) {
					isLastUserWithAccess = !credential.sharedWith.some((sharee) => {
						return this.workflow.sharedWith!.find(
							(workflowSharee) => workflowSharee.id === sharee.id,
						);
					});
				} else if (isCredentialSharee) {
					isLastUserWithAccess =
						!credential.sharedWith.some((sharee) => {
							return this.workflow.sharedWith!.find(
								(workflowSharee) => workflowSharee.id === sharee.id,
							);
						}) &&
						!this.workflow.sharedWith.find(
							(workflowSharee) => workflowSharee.id === credential.ownedBy.id,
						);
				}

				acc[credential.id] = isLastUserWithAccess;

				return acc;
			}, {});

			const isLastUserWithAccessToCredentials = Object.values(
				isLastUserWithAccessToCredentialsById,
			).some((value) => value);

			let confirm = true;
			if (!isNewSharee && isLastUserWithAccessToCredentials) {
				const confirmAction = await this.confirm(
					this.$locale.baseText(
						'workflows.shareModal.list.delete.confirm.lastUserWithAccessToCredentials.message',
						{
							interpolate: { name: user.fullName as string, workflow: this.workflow.name },
						},
					),
					this.$locale.baseText('workflows.shareModal.list.delete.confirm.title', {
						interpolate: { name: user.fullName as string },
					}),
					{
						confirmButtonText: this.$locale.baseText(
							'workflows.shareModal.list.delete.confirm.confirmButtonText',
						),
						cancelButtonText: this.$locale.baseText(
							'workflows.shareModal.list.delete.confirm.cancelButtonText',
						),
						dangerouslyUseHTMLString: true,
					},
				);

				confirm = confirmAction === MODAL_CONFIRM;
			}

			if (confirm) {
				this.sharedWith = this.sharedWith.filter((sharee: Partial<IUser>) => {
					return sharee.id !== user.id;
				});

				this.trackTelemetry({
					user_id_sharee: userId,
					warning_orphan_credentials: isLastUserWithAccessToCredentials,
				});
			}
		},
		onRoleAction(user: IUser, action: string) {
			if (action === 'remove') {
				void this.onRemoveSharee(user.id);
			}
		},
		async onCloseModal() {
			if (this.isDirty) {
				const shouldSave = await this.confirm(
					this.$locale.baseText('workflows.shareModal.saveBeforeClose.message'),
					this.$locale.baseText('workflows.shareModal.saveBeforeClose.title'),
					{
						type: 'warning',
						confirmButtonText: this.$locale.baseText(
							'workflows.shareModal.saveBeforeClose.confirmButtonText',
						),
						cancelButtonText: this.$locale.baseText(
							'workflows.shareModal.saveBeforeClose.cancelButtonText',
						),
					},
				);

				if (shouldSave === MODAL_CONFIRM) {
					return await this.onSave();
				}
			}

			return true;
		},
		async loadUsers() {
			await this.usersStore.fetchUsers();
		},
		goToUsersSettings() {
			this.$router.push({ name: VIEWS.USERS_SETTINGS }).catch((failure) => {
				if (!isNavigationFailure(failure)) {
					console.error(failure);
				}
			});
			this.modalBus.emit('close');
		},
		trackTelemetry(data: ITelemetryTrackProperties) {
			this.$telemetry.track('User selected sharee to remove', {
				workflow_id: this.workflow.id,
				user_id_sharer: this.currentUser?.id,
				sub_view: this.$route.name === VIEWS.WORKFLOWS ? 'Workflows listing' : 'Workflow editor',
				...data,
			});
		},
		goToUpgrade() {
			void this.uiStore.goToUpgrade('workflow_sharing', 'upgrade-workflow-sharing');
		},
		async initialize() {
			if (this.isSharingEnabled) {
				await this.loadUsers();

				if (
					this.workflow.id !== PLACEHOLDER_EMPTY_WORKFLOW_ID &&
					!this.workflow.sharedWith?.length // Sharing info already loaded
				) {
					await this.workflowsStore.fetchWorkflow(this.workflow.id);
				}
			}

			this.loading = false;
		},
	},
});
</script>

<style module lang="scss">
.container {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.container > * {
	overflow-wrap: break-word;
}

.content {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: auto;
}

.usersList {
	height: 100%;
	overflow-y: auto;
}

.actionButtons {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.roleSelect {
	max-width: 100px;
}

.roleSelectRemoveOption {
	border-top: 1px solid var(--color-foreground-base);
}
</style>
