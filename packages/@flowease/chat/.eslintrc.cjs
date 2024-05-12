const sharedOptions = require('@flowease/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@flowease/eslint-config/frontend'],

	...sharedOptions(__dirname, 'frontend'),
};
