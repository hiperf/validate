'use strict';

/**
 * Check that number is >= min value
 * @param {number} dataValue - input value
 * @param {number} validatorConfigValue - min expected value
 * @returns {boolean} 
 * @example
 * min(5,7); // false
 * min(7,5); // true
 */
function min(dataValue, validatorConfigValue) {
	return dataValue >= validatorConfigValue;
}

/**
 * Check for min string length
 * @param {string} dataValue - input string
 * @param {number} validatorConfigValue - min expected value
 * @returns {boolean} 
 * @example
 * minLenght('John', 5); // false
 * minLenght('John', 2); // true
 */
function minLenght(dataValue, validatorConfigValue) {
	return dataValue.length >= validatorConfigValue;
}

/**
 * Check if value is Number
 * @param {number} dataValue - input value
 * @returns {boolean} 
 * @example
 * isNumber(5); // true
 * isNumber('f'); // false
 */
function isNumber(dataValue) {
    return typeof dataValue == 'number';
}

/**
 * Check if value is String
 * @param {string} dataValue - input value
 * @returns {boolean} 
 * @example
 * isString(5); // false
 * isString('John'); // true
 */
function isString(dataValue) {
	return typeof dataValue == 'string';
}

/**
 * Check if value is Email
 * @param {string} dataValue - input value
 * @returns {boolean} 
 * @example
 * isEmail('John'); // false
 * isEmail('John@example.com'); // true
 */
function isEmail(dataValue) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataValue);
}

/**
 * Check if value is Boolean
 * @param {boolean} dataValue - input value
 * @returns {boolean} 
 * @example
 * isBoolean(false); // true
 * isBoolean(true); // true
 * isBoolean('John'); // false
 * isBoolean(1); // false
 */
function isBoolean(dataValue) {
	return typeof dataValue == 'boolean';
}

// todo: validator function is very primitive, need more advance check

/**
 * Check if value is Date
 * @param {string} dataValue - input value
 * @returns {boolean} 
 * @example
 * isDate('2024-04-25'); // true
 * isDate('John'); // false
 */
function isDate(dataValue) {
	return !isNaN(Date.parse(dataValue));
}

/**
 * Check if value is Object
 * @param {object} dataValue - input value
 * @returns {boolean} 
 * @example
 * isObject({name: 'John'}); // true
 * isObject('John'); // false
 */
function isObject(dataValue) {
	return typeof dataValue === 'object' &&
		!Array.isArray(dataValue) &&
		dataValue !== null;
}

/**
 * Check if value is Array
 * @param {array} dataValue - input value
 * @returns {boolean} 
 * @example
 * isArray(['John','Bob']); // true
 * isArray('John'); // false
 */
function isArray(dataValue) {
    return Array.isArray(dataValue);
}

const validators = {
	min,
	minLength: minLenght,
	isNumber,
	isString,
	isEmail,
	isBoolean,
	isDate,
	isObject,
	isArray,
};

var en = {
	"error-min": "Min value should be \"%e\", current value is \"%v\"",
	"error-isNumber": "Value \"%v\" should be number",
	"error-isString": "Value \"%v\" should be string",
	"error-isEmail": "\"%v\" is not a valid email",
	"error-minLength": "Min length should be \"%e\"",
	"error-isBoolean": "Value \"%v\" is not boolean or not equal \"%e\"",
	"error-validator-config-is-missing-value": "Validator \"%v\" config is an object, \"value\" key is required",
	"error-unknown-validator": "Unknown validator \"%v\", make sure you incuded this validator"
};

const locales = { en };

function d(key, options = {}, lang = 'en', locales) {
	if (!(lang in locales))
		throw new Error(`Lang "${lang}" doesn't exist in locales object. Available locales - ${locales.join(', ')}`);

	if (!(key in locales[lang]))
		throw new Error(`Key "${key}" does not exist in "${lang}" dictionary`);

	let result = locales[lang][key];

	for (let key in options) {
		result = result.replace(`%${key}`, options[key]);
	}

	return result;
}

/** 
 * @typedef {object} GetErrorParams
 * @property {*} validatorConfigValue - validator value
 * @property {*} validatorConfig - validator config
 * @property {string} validatorName - validator name
 * @property {string} fieldName - field to validate
 * @property {*} dataValue - validator input value
 */

/**
 * Form and return error message
 * @param {GetErrorParams} params 
 * @returns {string}
 */
function getError({ validatorConfigValue, validatorConfig, validatorName, fieldName, dataValue, lang, locales }) {
	let error = '';

	if (isObject(validatorConfig)) {
		if (!('value' in validatorConfig)) {
			throw new Error('Missing "value" key in validator config');
		}

		if ('error' in validatorConfig) error = validatorConfig.error;
	}

	return error ? error : `${fieldName}: ` + d(`error-${validatorName}`, { e: validatorConfigValue, v: dataValue }, lang, locales);
}

// Import

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
function validate(schema, data, lang = 'en', options = {}) {
	let errors = [];

	// Handle options
	if (!('locales' in options)) options.locales = {};
	if (!('validators' in options)) options.validators = {};

	const locales$1 = getItem(lang, options.locales, locales);

	// Iterate schema items
	for (let fieldName in schema) {
		const schemaItem = schema[fieldName];
		const isRequired = 'required' in schemaItem ? schemaItem.required : true;
		let dataValue;

		// Id schema key does not exist in data
		if (!data.hasOwnProperty(fieldName)) {
			// If data key is required
			if (isRequired) errors.push(d('field-required', { fieldName }, lang, locales$1));
			continue;
		}

		// Get data value
		dataValue = data[fieldName];

		// Iterate schema item keys
		for (let validatorName in schemaItem) {
			// Skip loop if validatorName is a reserved word
			if (reservedWords.includes(validatorName)) continue;

			const validator = getItem(validatorName, options.validators, validators);

			// Check if validator exist
			if (!validator && validatorName != 'custom') {
				throw new Error(d('error-unknown-validator', { v: validatorName }, lang, locales$1));
			}
			const validatorConfig = schemaItem[validatorName];
			let validatorConfigValue = validatorConfig;

			// Check if validatorConfig is an object
			if (getItem('isObject', options.validators, validators)(validatorConfig)) {
				if (!('value' in validatorConfig))
					throw new Error(d('error-validator-config-is-missing-value', { v: validatorName }, lang, locales$1));

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
						locales: locales$1
					});
					errors.push(error);
				}
			}

		}
	}

	return { isValid: errors.length === 0, errors };
}

exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isEmail = isEmail;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.locales = locales;
exports.min = min;
exports.minLength = minLenght;
exports.validate = validate;
exports.validators = validators;
