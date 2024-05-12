<template>
	<flowease-popover trigger="click" width="304" size="large">
		<template #reference>
			<flowease-button
				icon="filter"
				type="tertiary"
				:active="hasFilters"
				:class="[$style['filter-button'], 'ml-2xs']"
				data-test-id="resources-list-filters-trigger"
			>
				<flowease-badge v-show="filtersLength > 0" theme="primary" class="mr-4xs">
					{{ filtersLength }}
				</flowease-badge>
				{{ $locale.baseText('forms.resourceFiltersDropdown.filters') }}
			</flowease-button>
		</template>
		<div :class="$style['filters-dropdown']" data-test-id="resources-list-filters-dropdown">
			<slot :filters="modelValue" :set-key-value="setKeyValue" />
			<enterprise-edition
				v-if="shareable"
				class="mb-s"
				:features="[EnterpriseEditionFeature.Sharing]"
			>
				<flowease-input-label
					:label="$locale.baseText('forms.resourceFiltersDropdown.ownedBy')"
					:bold="false"
					size="small"
					color="text-base"
					class="mb-3xs"
				/>
				<flowease-user-select
					:users="ownedByUsers"
					:current-user-id="usersStore.currentUser.id"
					:model-value="modelValue.ownedBy"
					size="medium"
					@update:model-value="setKeyValue('ownedBy', $event)"
				/>
			</enterprise-edition>
			<enterprise-edition v-if="shareable" :features="[EnterpriseEditionFeature.Sharing]">
				<flowease-input-label
					:label="$locale.baseText('forms.resourceFiltersDropdown.sharedWith')"
					:bold="false"
					size="small"
					color="text-base"
					class="mb-3xs"
				/>
				<flowease-user-select
					:users="sharedWithUsers"
					:current-user-id="usersStore.currentUser.id"
					:model-value="modelValue.sharedWith"
					size="medium"
					@update:model-value="setKeyValue('sharedWith', $event)"
				/>
			</enterprise-edition>
			<div v-if="hasFilters" :class="[$style['filters-dropdown-footer'], 'mt-s']">
				<flowease-link @click="resetFilters">
					{{ $locale.baseText('forms.resourceFiltersDropdown.reset') }}
				</flowease-link>
			</div>
		</div>
	</flowease-popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EnterpriseEditionFeature } from '@/constants';
import { mapStores } from 'pinia';
import { useUsersStore } from '@/stores/users.store';
import type { PropType } from 'vue';
import type { IUser } from '@/Interface';

export type IResourceFiltersType = Record<string, boolean | string | string[]>;

export default defineComponent({
	props: {
		modelValue: {
			type: Object as PropType<IResourceFiltersType>,
			default: () => ({}),
		},
		keys: {
			type: Array as PropType<string[]>,
			default: () => [],
		},
		shareable: {
			type: Boolean,
			default: true,
		},
		reset: {
			type: Function as PropType<() => void>,
		},
	},
	data() {
		return {
			EnterpriseEditionFeature,
		};
	},
	computed: {
		...mapStores(useUsersStore),
		ownedByUsers(): IUser[] {
			return this.usersStore.allUsers.map((user) =>
				user.id === this.modelValue.sharedWith ? { ...user, disabled: true } : user,
			);
		},
		sharedWithUsers(): IUser[] {
			return this.usersStore.allUsers.map((user) =>
				user.id === this.modelValue.ownedBy ? { ...user, disabled: true } : user,
			);
		},
		filtersLength(): number {
			let length = 0;

			this.keys.forEach((key) => {
				if (key === 'search') {
					return;
				}

				length += (
					Array.isArray(this.modelValue[key])
						? this.modelValue[key].length > 0
						: this.modelValue[key] !== ''
				)
					? 1
					: 0;
			});

			return length;
		},
		hasFilters(): boolean {
			return this.filtersLength > 0;
		},
	},
	watch: {
		filtersLength(value: number) {
			this.$emit('update:filtersLength', value);
		},
	},
	methods: {
		setKeyValue(key: string, value: unknown) {
			const filters = {
				...this.modelValue,
				[key]: value,
			};

			this.$emit('update:modelValue', filters);
		},
		resetFilters() {
			if (this.reset) {
				this.reset();
			} else {
				const filters = { ...this.modelValue };

				this.keys.forEach((key) => {
					filters[key] = Array.isArray(this.modelValue[key]) ? [] : '';
				});

				this.$emit('update:modelValue', filters);
			}
		},
	},
});
</script>

<style lang="scss" module>
.filter-button {
	height: 40px;
	align-items: center;
}

.filters-dropdown {
	width: 280px;
	padding-bottom: var(--spacing-s);
}

.filters-dropdown-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
