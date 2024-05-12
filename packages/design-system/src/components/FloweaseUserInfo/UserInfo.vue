<template>
	<div :class="classes">
		<div :class="$style.avatarContainer">
			<FloweaseAvatar :first-name="firstName" :last-name="lastName" />
		</div>

		<div v-if="isPendingUser" :class="$style.pendingUser">
			<FloweaseText :bold="true">{{ email }}</FloweaseText>
			<span :class="$style.pendingBadge"><FloweaseBadge :bold="true">Pending</FloweaseBadge></span>
		</div>
		<div v-else :class="$style.infoContainer">
			<div>
				<FloweaseText :bold="true" color="text-dark">
					{{ firstName }} {{ lastName }}
					{{ isCurrentUser ? t('nds.userInfo.you') : '' }}
				</FloweaseText>
				<span v-if="disabled" :class="$style.pendingBadge">
					<FloweaseBadge :bold="true">Disabled</FloweaseBadge>
				</span>
			</div>
			<div>
				<FloweaseText data-test-id="user-email" size="small" color="text-light">{{
					email
				}}</FloweaseText>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, useCssModule } from 'vue';
import FloweaseText from '../FloweaseText';
import FloweaseAvatar from '../FloweaseAvatar';
import FloweaseBadge from '../FloweaseBadge';
import { useI18n } from '../../composables/useI18n';

interface UsersInfoProps {
	firstName?: string;
	lastName?: string;
	email?: string;
	isOwner?: boolean;
	isPendingUser?: boolean;
	isCurrentUser?: boolean;
	disabled?: boolean;
	settings?: object;
	isSamlLoginEnabled?: boolean;
}

const props = withDefaults(defineProps<UsersInfoProps>(), {
	disabled: false,
});

const { t } = useI18n();

const $style = useCssModule();
const classes = computed(
	(): Record<string, boolean> => ({
		[$style.container]: true,
		[$style.disabled]: props.disabled,
	}),
);
</script>

<style lang="scss" module>
.container {
	display: inline-flex;
	overflow: hidden;
}

.avatarContainer {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: var(--color-text-light);
}

.infoContainer {
	flex-grow: 1;
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	margin-left: var(--spacing-xs);
}

.pendingUser {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-left: var(--spacing-xs);
}

.pendingBadge {
	margin-left: var(--spacing-xs);
}

.disabled {
	opacity: 0.5;
}
</style>
