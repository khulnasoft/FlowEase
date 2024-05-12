const sharedOptions = require('@flowease/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@flowease/eslint-config/node'],

	...sharedOptions(__dirname),

	parserOptions: {
		project: './tsconfig.json',
	},

	ignorePatterns: [
		'jest.config.js',
		// TODO: Remove these
		'src/databases/ormconfig.ts',
	],

	rules: {
		'flowease-local-rules/no-dynamic-import-template': 'error',
		complexity: 'error',

		// TODO: Remove this
		'import/no-cycle': 'warn',
		'import/order': 'off',
		'import/extensions': 'warn',
		'@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': true }],
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-base-to-string': 'warn',
		'@typescript-eslint/prefer-nullish-coalescing': 'warn',
		'@typescript-eslint/no-redundant-type-constituents': 'warn',
		'@typescript-eslint/ban-types': 'warn',
		'@typescript-eslint/no-unsafe-enum-comparison': 'warn',
		'@typescript-eslint/no-unsafe-declaration-merging': 'warn',
	},
};
