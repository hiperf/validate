// Import
ROLLUP_IMPORT_VALIDATORS; // libValidators
ROLLUP_IMPORT_LOCALES; // libLocales
import getError from './utils/getError';
import d from './utils/d';

// Data
const reservedWords = ['required'];

/**
 * Get item by key from user data or lib data
 * @param {string} name 
 * @param {Object} userData 
 * @param {Object} libData 
 * @returns {*}
 */
function getItem(name, userData = {}, libData = {}) {
	return (name in userData) ? userData[name] : ((name in libData) ? libData[name] : null);
}

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

	const locales = getItem(lang, options.locales, libLocales);

	// Iterate schema items
	for (let fieldName in schema) {
		const schemaItem = schema[fieldName];
		const isRequired = 'required' in schemaItem ? schemaItem.required : true;
		let dataValue;

		// Id schema key does not exist in data
		if (!data.hasOwnProperty(fieldName)) {
			// If data key is required
			if (isRequired) errors.push(d('field-required', { fieldName }, lang, locales));
			continue;
		}

		// Get data value
		dataValue = data[fieldName];

		// Iterate schema item keys
		for (let validatorName in schemaItem) {
			// Skip loop if validatorName is a reserved word
			if (reservedWords.includes(validatorName)) continue;

			const validator = getItem(validatorName, options.validators, libValidators);

			// Check if validator exist
			if (!validator && validatorName != 'custom') {
				throw new Error(d('error-unknown-validator', { v: validatorName }, lang, locales));
			}
			const validatorConfig = schemaItem[validatorName];
			let validatorConfigValue = validatorConfig;

			// Check if validatorConfig is an object
			if (getItem('isObject', options.validators, libValidators)(validatorConfig)) {
				if (!('value' in validatorConfig))
					throw new Error(d('error-validator-config-is-missing-value', { v: validatorName }, lang, locales));

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
				const success = validator(
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
						locales
					});
					errors.push(error);
				}
			}

		}
	}

	return { isValid: errors.length === 0, errors };
}