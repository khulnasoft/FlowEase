const sharedOptions = require('@flowease/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@flowease/eslint-config/frontend'],

	...sharedOptions(__dirname, 'frontend'),

	rules: {
		// TODO: Remove these
		'import/no-default-export': 'warn',
		'import/order': 'off',
		'@typescript-eslint/no-unsafe-argument': 'warn',
		'@typescript-eslint/no-unsafe-return': 'warn',
		'@typescript-eslint/no-unsafe-member-access': 'warn',
		'@typescript-eslint/prefer-optional-chain': 'warn',
		'@typescript-eslint/prefer-nullish-coalescing': 'warn',
	},

	overrides: [
		{
			files: ['src/**/*.stories.ts', 'src/**/*.vue', 'src/**/*.spec.ts'],
			rules: {
				'@typescript-eslint/naming-convention': [
					'warn',
					{
						selector: ['variable', 'property'],
						format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
					},
				],
			},
		},
		{
			files: ['src/components/FloweaseFormInput/validators.ts'],
			rules: {
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: ['property'],
						format: ['camelCase', 'UPPER_CASE'],
					},
				],
			},
		},
	],
};
