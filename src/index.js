/*
 * @typedef {Object} validate_result
 * @property {boolean} isValid
 * @property {string[]} errors
 */

import validators from './validators/index';
import getError from './utils/getError';
import d from './utils/d';



/**
 * json schema validator
 * @param {Object} schema - схема валидации
 * @param {Object} data - входные параметры
 * @param {string} [lang=en] - язык вывода ошибок
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
 * 
 * @returns {validate_result}
 */
export function validate (schema, data, lang) {
	const reservedWords = ['required'];
	let isValid = true;
	let errors = [];

	// Iterate schema items
	for (let fieldName in schema) {
		const schemaItem = schema[fieldName];
		const isRequired = 'required' in schemaItem ? schemaItem.required : true;
		let dataValue;

		// Id schema key does not exist in data
		if (!data.hasOwnProperty(fieldName)) {
			// If data key is required
			if (isRequired) errors.push(d('field-required', { fieldName }));
			continue;
		}

		// Get data value
		dataValue = data[fieldName];

		// Iterate schema item keys
		for (let validatorName in schemaItem) {
			// Skip loop if validatorName is a reserved word
			if (reservedWords.includes(validatorName)) continue;

			// Check if validator exist
			if (!validators.hasOwnProperty(validatorName))
				throw new Error(d("error-unknown-validator", { v: validatorName }, lang));

			const validatorConfig = schemaItem[validatorName];
			let validatorConfigValue = validatorConfig;

			// Check if validatorConfig is an object
			if (validators.isObject(validatorConfig)) {
				if (!('value' in validatorConfig))
					throw new Error(d("error-validator-config-is-missing-value", { v: validatorName }, lang));

				validatorConfigValue = validatorConfig.value;
			}

			const result = validators[validatorName](
				dataValue,
				validatorConfigValue,
				validatorConfig
			);

			if (!result) {
				const error = getError({
					validatorConfigValue,
					validatorConfig,
					validatorName,
					fieldName,
					dataValue,
				});
				errors.push(error);
			}
		}
	}

	isValid = errors.length === 0;

	return { errors, isValid };
}
