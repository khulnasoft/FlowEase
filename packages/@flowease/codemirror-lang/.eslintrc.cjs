const sharedOptions = require('@flowease/eslint-config/shared');

/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: ['@flowease/eslint-config/base'],

	...sharedOptions(__dirname),

	ignorePatterns: [
		'src/expressions/grammar*.ts'
	]
};
