/* eslint-disable @typescript-eslint/naming-convention */
import type { StoryFn } from '@storybook/vue3';
import UserStack from './UserStack.vue';

export default {
	title: 'Modules/UserStack',
	component: UserStack,
};

const Template: StoryFn = (args) => ({
	setup: () => ({ args }),
	props: args,
	components: {
		UserStack,
	},
	template: '<flowease-user-stack v-bind="args" />',
});

export const WithGroups = Template.bind({});
WithGroups.args = {
	currentUserEmail: 'sunny@flowease.khulnasoft.com',
	users: {
		Owners: [
			{
				id: '1',
				firstName: 'Sunny',
				lastName: 'Side',
				fullName: 'Sunny Side',
				email: 'sunny@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: true,
				signInType: 'email',
				disabled: false,
			},
			{
				id: '2',
				firstName: 'Kobi',
				lastName: 'Dog',
				fullName: 'Kobi Dog',
				email: 'kobi@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: false,
				signInType: 'ldap',
				disabled: true,
			},
		],
		'Other users': [
			{
				id: '3',
				firstName: 'John',
				lastName: 'Doe',
				fullName: 'John Doe',
				email: 'john@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: false,
				signInType: 'email',
				disabled: false,
			},
			{
				id: '4',
				firstName: 'Jane',
				lastName: 'Doe',
				fullName: 'Jane Doe',
				email: 'jane@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: false,
				signInType: 'ldap',
				disabled: true,
			},
			{
				id: '5',
				firstName: 'Test',
				lastName: 'User',
				fullName: 'Test User',
				email: 'test@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: true,
				isOwner: false,
				signInType: 'email',
				disabled: false,
			},
		],
		'Empty Group': [],
	},
};

export const SingleGroup = Template.bind({});
SingleGroup.args = {
	currentUserEmail: 'sunny@flowease.khulnasoft.com',
	users: {
		Owners: [
			{
				id: '1',
				firstName: 'Sunny',
				lastName: 'Side',
				fullName: 'Sunny Side',
				email: 'sunny@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: true,
				signInType: 'email',
				disabled: false,
			},
			{
				id: '2',
				firstName: 'Kobi',
				lastName: 'Dog',
				fullName: 'Kobi Dog',
				email: 'kobi@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: false,
				signInType: 'ldap',
				disabled: true,
			},
			{
				id: '4',
				firstName: 'Jane',
				lastName: 'Doe',
				fullName: 'Jane Doe',
				email: 'jane@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: false,
				signInType: 'ldap',
				disabled: true,
			},
			{
				id: '5',
				firstName: 'Test',
				lastName: 'User',
				fullName: 'Test User',
				email: 'test@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: true,
				isOwner: false,
				signInType: 'email',
				disabled: false,
			},
		],
	},
};

export const NoCutoff = Template.bind({});
NoCutoff.args = {
	currentUserEmail: 'sunny@flowease.khulnasoft.com',
	users: {
		Owners: [
			{
				id: '1',
				firstName: 'Sunny',
				lastName: 'Side',
				fullName: 'Sunny Side',
				email: 'sunny@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: true,
				signInType: 'email',
				disabled: false,
			},
			{
				id: '2',
				firstName: 'Kobi',
				lastName: 'Dog',
				fullName: 'Kobi Dog',
				email: 'kobi@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: false,
				signInType: 'ldap',
				disabled: true,
			},
			{
				id: '3',
				firstName: 'John',
				lastName: 'Doe',
				fullName: 'John Doe',
				email: 'john@flowease.khulnasoft.com',
				isDefaultUser: false,
				isPendingUser: false,
				isOwner: false,
				signInType: 'email',
				disabled: false,
			},
		],
	},
};
