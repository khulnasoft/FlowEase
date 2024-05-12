import type { StoryFn } from '@storybook/vue3';
import FloweaseUserInfo from './UserInfo.vue';

export default {
	title: 'Modules/UserInfo',
	component: FloweaseUserInfo,
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const Template: StoryFn = (args, { argTypes }) => ({
	setup: () => ({ args }),
	props: Object.keys(argTypes),
	components: {
		FloweaseUserInfo,
	},
	template: '<flowease-user-info v-bind="args" />',
});

export const Member = Template.bind({});
Member.args = {
	firstName: 'Oscar',
	lastName: 'Wilde',
	email: 'test@flowease.khulnasoft.com',
};

export const Current = Template.bind({});
Current.args = {
	firstName: 'Ham',
	lastName: 'Sam',
	email: 'test@flowease.khulnasoft.com',
	isCurrentUser: true,
};

export const Invited = Template.bind({});
Invited.args = {
	email: 'test@flowease.khulnasoft.com',
	isPendingUser: true,
};
