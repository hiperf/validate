/**
 * Проверка на минимальное значения
 * @param {number} dataValue - входные параметры
 * @param {number} validatorConfigValue - ожидаемое значения
 * @returns {boolean} 
 * @example
 * min(5,7); // result = false
 * min(7,5); // result = true
 */
function min(dataValue, validatorConfigValue) {
	return dataValue >= validatorConfigValue;
}

/**
 * Проверка на минимальную длину симболов
 * @param {number} dataValue - входные параметры
 * @param {number} validatorConfigValue - ожидаемое значения
 * @returns {boolean} 
 * @example
 * minLenght("John",5); // result = false
 * minLenght("John",2); // result = true
 */
function minLenght(dataValue, validatorConfigValue) {
	return dataValue.length >= validatorConfigValue;
}

/**
 * Проверка на тип number
 * @param {number} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isNumber(5); // result = true
 * isNumber("f"); // result = false
 */
function isNumber (dataValue) {
    return typeof dataValue == 'number';
}

/**
 * Проверка на тип string
 * @param {number} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isString(5); // result = false
 * isString("John"); // result = true
 */
function isString(dataValue) {
	return typeof dataValue == 'string';
}

/**
 * Проверка на тип email
 * @param {email} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isEmail("John"); // result = false
 * isEmail("John@example.com"); // result = true
 */
function isEmail(dataValue) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataValue);
}

/**
 * Проверка на тип boolean и сравнения dataValue c validatorConfigValue
 * @param {boolean} dataValue - входные параметры
 * @param {boolean} validatorConfigValue - ожидаемое значения
 * @returns {boolean} 
 * @example
 * isBoolean(false, true); // result = false
 * isBoolean(true, false); // result = false
 * isBoolean(true, true); // result = true
 * isBoolean(false, false); // result = true
 * isBoolean('a', true); // result = false
 */
function isBoolean (dataValue, validatorConfigValue) {
	return typeof dataValue == 'boolean' && dataValue == validatorConfigValue;
}

/**
 * Проверка на тип даты
 * @param {string} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isDate("2024-04-25"); // result = true
 * isDate("John"); // result = false
 */
function isDate(dataValue) {
	return !isNaN(Date.parse(dataValue));
}

/**
 * Проверка на тип object
 * @param {object} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isObject({name:"John"}); // result = true
 * isObject("John"); // result = false
 */
function isObject(dataValue) {
	return typeof dataValue === 'object' &&
		!Array.isArray(dataValue) &&
		dataValue !== null;
}

/**
 * Проверка на тип object
 * @param {array} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isArray(["John","Bob"]); // result = true
 * isArray("John"); // result = false
 */
function isArray(dataValue) {
    return Array.isArray(dataValue);
}

var validators = {
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
	"error-unknown-validator": "Unknown validator \"%v\""
};

var langs = { en };

function d (key, options = {}, lang = "en") {
	if (!(lang in langs))
		throw new Error(`lang "${lang}" doesn't exist object langs`);

	if (!(key in langs[lang]))
		throw new Error(`dictionary key "${key}" does not exist`);

	let result = langs[lang][key];

	for (let key in options) {
		result = result.replace(`%${key}`, options[key]);
	}

	return result;
}

function getError ({ validatorConfigValue, validatorConfig, validatorName, fieldName, dataValue }) {
	let error = '';

	if (isObject(validatorConfig)) {
		if (!('value' in validatorConfig)) {
			console.log('validator config:', validatorConfig);
			throw new Error('missing "value" key in validator config');
		}

		if ('error' in validatorConfig) error = validatorConfig.error;
	}

	return error ? error : `${fieldName}: ` + d(`error-${validatorName}`, { e: validatorConfigValue, v: dataValue })
}

/*
 * @typedef {Object} validate_result
 * @property {boolean} isValid
 * @property {string[]} errors
 */




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
function validate (schema, data, lang) {
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
			if (!validators.hasOwnProperty(validatorName) && validatorName != "custom") {
				throw new Error(d("error-unknown-validator", { v: validatorName }, lang));
			}
			const validatorConfig = schemaItem[validatorName];
			let validatorConfigValue = validatorConfig;

			// Check if validatorConfig is an object
			if (validators.isObject(validatorConfig)) {
				if (!('value' in validatorConfig))
					throw new Error(d("error-validator-config-is-missing-value", { v: validatorName }, lang));

				validatorConfigValue = validatorConfig.value;
			}
			if (validatorName === "custom") {
				let custom = Array.isArray(validatorConfig) ? validatorConfig : [validatorConfig];
				for (let element of custom) {
					let result = element(dataValue);
					if (!result.isValid) {
						for (let element of result.errors) {
							errors.push(element);
						}
					}
				}

			} else {
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
	}

	isValid = errors.length === 0;

	return { errors, isValid };
}

export { isArray, isBoolean, isDate, isEmail, isNumber, isObject, isString, min, minLenght as minLength, validate };
