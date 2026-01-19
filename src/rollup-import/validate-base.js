// This file is imported by rollup config and injected inside scripts
// Base validator
// @ts-nocheck

/**
 * Get validator by id
 * @param {string} name 
 * @param {Object} userData 
 * @param {Object} libData 
 * @returns {Function}
 */
function getValidator(name, userData = {}, libData = {}) {
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
 * @property {string} lang
 * @property {Object.<string, LocaleObject>} locales
 * @property {Object.<string, Function>} validators
 */

/**
 * Schema validator
 * @param {Object} schema - validation schema
 * @param {Object} data - income values
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
export default function(schema, data, options = {}) {
	let errors = [];

	// Handle options
	const lang = options?.lang || defaultLang;
	const userLocales = options?.locales || {};
	const userValidators = options?.validators || {};
	const detailedErrors = options?.detailedErrors || false;

	// Iterate schema items
	for (let field in schema) {
		const schemaItem = schema[field];
		let isRequired = 'required' in schemaItem ? schemaItem.required : 1;
		let fieldName = 'fieldName' in schemaItem ? schemaItem.fieldName : field;
		let dataValue;

		// Id schema key does not exist in data
		if (!data.hasOwnProperty(field)) {
			// If data key is required
			if (isRequired) {
				const message = d('required', { v: fieldName }, lang, userLocales, libLocales);

				errors.push(detailedErrors ? {
					field,
					fieldName,
					message
				} : message);
			}
			continue;
		}

		// Get data value
		dataValue = data[field];

		// Iterate schema item keys
		for (let validatorName in schemaItem) {
			// Skip loop if validatorName is a reserved word e.g. ['required']
			if (validatorName == 'required' || validatorName == 'fieldName') continue;

			const validator = getValidator(validatorName, userValidators, libValidators);

			// Check if validator exist
			if (!validator && validatorName != 'custom') {
				throw new Error(d('unknown-validator', { v: validatorName }, lang, userLocales, libLocales));
			}
			const validatorConfig = schemaItem[validatorName];
			let validatorConfigValue = validatorConfig;

			// Check if validatorConfig is an object
			if (isObject(validatorConfig) && ('value' in validatorConfig)) {
				validatorConfigValue = validatorConfig.value;
			}

			// If custom validator(s) used
			if (validatorName === 'custom') {
				// Make sure that customVaidators is Array
				const customVaidators = Array.isArray(validatorConfig) ? validatorConfig : [validatorConfig];
				
				// Iterate custom validator(s)
				for (let validator of customVaidators) {
					const resultErrors = validator(dataValue);

					// Check that custom validator return correct data
					// * errors type is not checked
					if (!Array.isArray(resultErrors)) {
						throw new Error(`${fieldName}: Custom validator should return array of errors`);
					}

					// Push errors from custom validator
					for (let error of resultErrors) {
						// Skip empty strings
						if (error !== '') errors.push(error);
					}
				}

			} else {
				// If validator return false then push errors
				if (!validator(dataValue, validatorConfigValue, validatorConfig)) {
					errors.push(
						getError({
							validatorConfigValue,
							validatorConfig,
							validatorName,
							dataValue,
							lang,
							userLocales,
							libLocales,
							field,
							fieldName,
							detailedErrors
						})
					);
				}
			}

		}
	}

	return { isValid: errors.length == 0, errors };
}