const sharedOptions = require('@flowease/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@flowease/eslint-config/base'],

	...sharedOptions(__dirname),

	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',
		'flowease-local-rules/no-plain-errors': 'off',
	},
};
