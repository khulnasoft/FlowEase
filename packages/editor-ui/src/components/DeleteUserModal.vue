<template>
	<Modal
		:name="modalName"
		:title="title"
		:center="true"
		width="460px"
		:event-bus="modalBus"
		@enter="onSubmit"
	>
		<template #content>
			<div>
				<div v-if="isPending">
					<flowease-text color="text-base">{{
						$locale.baseText('settings.users.confirmUserDeletion')
					}}</flowease-text>
				</div>
				<div v-else :class="$style.content">
					<div>
						<flowease-text color="text-base">{{
							$locale.baseText('settings.users.confirmDataHandlingAfterDeletion')
						}}</flowease-text>
					</div>
					<el-radio
						:model-value="operation"
						label="transfer"
						@update:model-value="() => setOperation('transfer')"
					>
						<flowease-text color="text-dark">{{
							$locale.baseText('settings.users.transferWorkflowsAndCredentials')
						}}</flowease-text>
					</el-radio>
					<div v-if="operation === 'transfer'" :class="$style.optionInput">
						<flowease-input-label :label="$locale.baseText('settings.users.userToTransferTo')">
							<flowease-user-select
								:users="usersStore.allUsers"
								:model-value="transferId"
								:ignore-ids="ignoreIds"
								:current-user-id="usersStore.currentUserId"
								@update:model-value="setTransferId"
							/>
						</flowease-input-label>
					</div>
					<el-radio
						:model-value="operation"
						label="delete"
						@update:model-value="() => setOperation('delete')"
					>
						<flowease-text color="text-dark">{{
							$locale.baseText('settings.users.deleteWorkflowsAndCredentials')
						}}</flowease-text>
					</el-radio>
					<div
						v-if="operation === 'delete'"
						:class="$style.optionInput"
						data-test-id="delete-data-input"
					>
						<flowease-input-label :label="$locale.baseText('settings.users.deleteConfirmationMessage')">
							<flowease-input
								:model-value="deleteConfirmText"
								:placeholder="$locale.baseText('settings.users.deleteConfirmationText')"
								@update:model-value="setConfirmText"
							/>
						</flowease-input-label>
					</div>
				</div>
			</div>
		</template>
		<template #footer>
			<flowease-button
				:loading="loading"
				:disabled="!enabled"
				:label="$locale.baseText('settings.users.delete')"
				float="right"
				@click="onSubmit"
			/>
		</template>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from '@/composables/useToast';
import Modal from '@/components/Modal.vue';
import type { IUser } from '@/Interface';
import { mapStores } from 'pinia';
import { useUsersStore } from '@/stores/users.store';
import { createEventBus } from 'flowease-design-system/utils';

export default defineComponent({
	name: 'DeleteUserModal',
	components: {
		Modal,
	},
	props: {
		modalName: {
			type: String,
		},
		activeId: {
			type: String,
		},
	},
	setup() {
		return {
			...useToast(),
		};
	},
	data() {
		return {
			modalBus: createEventBus(),
			loading: false,
			operation: '',
			deleteConfirmText: '',
			transferId: '',
			ignoreIds: [this.activeId],
		};
	},
	computed: {
		...mapStores(useUsersStore),
		userToDelete(): IUser | null {
			return this.usersStore.getUserById(this.activeId);
		},
		isPending(): boolean {
			return this.userToDelete ? this.userToDelete && !this.userToDelete.firstName : false;
		},
		title(): string {
			const user =
				(this.userToDelete && (this.userToDelete.fullName || this.userToDelete.email)) || '';
			return this.$locale.baseText('settings.users.deleteUser', { interpolate: { user } });
		},
		enabled(): boolean {
			if (this.isPending) {
				return true;
			}
			if (
				this.operation === 'delete' &&
				this.deleteConfirmText === this.$locale.baseText('settings.users.deleteConfirmationText')
			) {
				return true;
			}

			if (this.operation === 'transfer' && this.transferId) {
				return true;
			}

			return false;
		},
	},
	methods: {
		setOperation(operation: string) {
			this.operation = operation;
			this.transferId = '';
		},
		setConfirmText(text: string) {
			this.deleteConfirmText = text;
		},
		setTransferId(id: string) {
			this.transferId = id;
		},
		async onSubmit() {
			try {
				if (!this.enabled) {
					return;
				}

				this.loading = true;

				const params = { id: this.activeId } as { id: string; transferId?: string };
				if (this.operation === 'transfer') {
					params.transferId = this.transferId;
				}

				await this.usersStore.deleteUser(params);

				let message = '';
				if (this.transferId) {
					const transferUser: IUser | null = this.usersStore.getUserById(this.transferId);
					if (transferUser) {
						message = this.$locale.baseText('settings.users.transferredToUser', {
							interpolate: { user: transferUser.fullName || '' },
						});
					}
				}

				this.showMessage({
					type: 'success',
					title: this.$locale.baseText('settings.users.userDeleted'),
					message,
				});

				this.modalBus.emit('close');
			} catch (error) {
				this.showError(error, this.$locale.baseText('settings.users.userDeletedError'));
			}
			this.loading = false;
		},
	},
});
</script>

<style lang="scss" module>
.content {
	padding-bottom: var(--spacing-2xs);
	> * {
		margin-bottom: var(--spacing-s);
	}
}

.innerContent {
	> * {
		margin-bottom: var(--spacing-2xs);
	}
}

.optionInput {
	padding-left: var(--spacing-l);
}
</style>
