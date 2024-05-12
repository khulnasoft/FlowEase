const sharedOptions = require('@flowease_io/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@flowease_io/eslint-config/frontend'],

	...sharedOptions(__dirname, 'frontend'),
};
