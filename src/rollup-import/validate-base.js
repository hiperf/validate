// This file is imported by rollup config and injected inside scripts
// Base validator

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
 * Shema validator
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

	// Iterate schema items
	for (let fieldName in schema) {
		const schemaItem = schema[fieldName];
		const isRequired = 'required' in schemaItem ? schemaItem.required : true;
		let dataValue;

		// Id schema key does not exist in data
		if (!data.hasOwnProperty(fieldName)) {
			// If data key is required
			if (isRequired) errors.push(d('required', { v: fieldName }, lang, userLocales, libLocales));
			continue;
		}

		// Get data value
		dataValue = data[fieldName];

		// Iterate schema item keys
		for (let validatorName in schemaItem) {
			// Skip loop if validatorName is a reserved word ['required']
			if (validatorName == 'required') continue;

			const validator = getValidator(validatorName, userValidators, libValidators);

			// Check if validator exist
			if (!validator && validatorName != 'custom') {
				throw new Error(d('unknown-validator', { v: validatorName }, lang, userLocales, libLocales));
			}
			const validatorConfig = schemaItem[validatorName];
			let validatorConfigValue = validatorConfig;

			// Check if validatorConfig is an object
			if (isObject(validatorConfig)) {
				if (!('value' in validatorConfig))
					throw new Error(d('validator-config-value', { v: validatorName }, lang, userLocales, libLocales));

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
							fieldName,
							dataValue,
							lang,
							userLocales,
							libLocales
						})
					);
				}
			}

		}
	}

	return { isValid: errors.length == 0, errors };
}