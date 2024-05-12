const sharedOptions = require('@flowease_io/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@flowease_io/eslint-config/base'],

	...sharedOptions(__dirname),

	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',
		'flowease-local-rules/no-plain-errors': 'off',
	},
};
