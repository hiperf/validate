import d from './d';
import isObject from '../validators/isObject';

/**
 * @typedef {Object} DetailedError
 * @property {string} message - error message
 * @property {string} field - field id
 * @property {string} fieldName - field name
 */

/** 
 * @typedef {Object} GetErrorParams
 * @property {*} validatorConfigValue - validator value
 * @property {*} validatorConfig - validator config
 * @property {string} validatorName - validator name
 * @property {string} field - field to validate
 * @property {string} fieldName - user defined field name
 * @property {*} dataValue - validator input value
 * @property {string} lang - errors language
 * @property {Object.<string, Object>} userLocales - user defined locales
 * @property {Object.<string, Object>} libLocales - lib locales
 * @property {boolean} detailedErrors - return detailed error object
 */

/**
 * Form and return error message
 * @param {GetErrorParams} params 
 * @returns {string|DetailedError}
 */
export default function({ validatorConfigValue, validatorConfig, validatorName, field, fieldName, dataValue, lang, userLocales, libLocales, detailedErrors }) {
	const isCustom = isObject(validatorConfig) && ('error' in validatorConfig);
	const message = isCustom
                  ? validatorConfig.error 
                  : d(validatorName, { e: validatorConfigValue, v: dataValue }, lang, userLocales, libLocales);

	return detailedErrors ? {
		field,
		fieldName,
		message
	} : (isCustom ? '' : fieldName +': ') + message;
}