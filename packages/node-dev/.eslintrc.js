const sharedOptions = require('@flowease_io/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@flowease_io/eslint-config/base'],
	...sharedOptions(__dirname),
	ignorePatterns: [
		'templates/**', // TODO: remove this
	],
	rules: {
		'import/order': 'off', // TODO: remove this
		'@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': true }],
		'flowease-local-rules/no-plain-errors': 'off',
	},
};
