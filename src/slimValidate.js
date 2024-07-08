import getError from './utils/getError';
import d from './utils/d';

// Data
const reservedWords = ['required'];

/**
 * @typedef {Object} ValidateResult
 * @property {boolean} isValid
 * @property {string[]} errors
 */

/** @typedef {Object.<string, string>} LocaleObject */

/**
 * @typedef {Object} ValidateOptions
 * @property {string} defaultLang
 * @property {Object.<string, LocaleObject>} locales
 * @property {Object.<string, Function>} validators
 */

/**
 * Shema validator
 * @param {Object} schema - validation schema
 * @param {Object} data - income values
 * @param {string} [lang=en] - errors language
 * @param {ValidateOptions} options - validate options
 * @returns {ValidateResult}
 * @example
 * const schema = {
 *   name: {
 *   	minLength: 3,
 *   	isString: true
 *   },
 *   email: {
 *   	isEmail: true
 *   },
 *   age: {
 *   	min: 18,
 *   	isNumber: {
 *   		value: true,
 *   		error: 'Custom isNumber error message'
 *   	},
 *   },
 * };
 * const data = {
 *   name: 'John',
 *   email: 'john@example.com',
 *   age: 33,
 * };
 * const { isValid, errors } = validator(schema, data);
 */
export default function(schema, data, lang = 'en', options = {}) {
	let errors = [];

	// Handle options
	if (!('locales' in options)) options.locales = {};
	if (!('validators' in options)) options.validators = {};

	// Iterate schema items
	for (let fieldName in schema) {
		const schemaItem = schema[fieldName];
		const isRequired = 'required' in schemaItem ? schemaItem.required : true;
		let dataValue;

		// Id schema key does not exist in data
		if (!data.hasOwnProperty(fieldName)) {
			// If data key is required
			if (isRequired) errors.push(d('field-required', { fieldName }, lang, options.locales));
			continue;
		}

		// Get data value
		dataValue = data[fieldName];

		// Iterate schema item keys
		for (let validatorName in schemaItem) {
			// Skip loop if validatorName is a reserved word
			if (reservedWords.includes(validatorName)) continue;

			// Check if validator exist
			if (!options.validators.hasOwnProperty(validatorName) && validatorName != 'custom') {
				throw new Error(d('error-unknown-validator', { v: validatorName }, lang, options.locales));
			}
			const validatorConfig = schemaItem[validatorName];
			let validatorConfigValue = validatorConfig;

			// Check if validatorConfig is an object
			if (options.validators.isObject(validatorConfig)) {
				if (!('value' in validatorConfig))
					throw new Error(d('error-validator-config-is-missing-value', { v: validatorName }, lang, options.locales));

				validatorConfigValue = validatorConfig.value;
			}

			// If custom validator(s) used
			if (validatorName === 'custom') {
				// Make sure that customVaidators is Array
				const customVaidators = Array.isArray(validatorConfig) ? validatorConfig : [validatorConfig];
				
				// Iterate custom validator(s)
				for (let validator of customVaidators) {
					const result = validator(dataValue);

					for (let error of result.errors) {
						errors.push(error);
					}
				}

			} else {
				const success = options.validators[validatorName](
					dataValue,
					validatorConfigValue,
					validatorConfig
				);

				if (!success) {
					const error = getError({
						validatorConfigValue,
						validatorConfig,
						validatorName,
						fieldName,
						dataValue,
						lang,
						locales: options.locales
					});
					errors.push(error);
				}
			}

		}
	}

	return { isValid: errors.length === 0, errors };
}