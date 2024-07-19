import d from './d';
import isObject from '../validators/isObject';

/** 
 * @typedef {Object} GetErrorParams
 * @property {*} validatorConfigValue - validator value
 * @property {*} validatorConfig - validator config
 * @property {string} validatorName - validator name
 * @property {string} fieldName - field to validate
 * @property {*} dataValue - validator input value
 * @property {string} lang - errors language
 * @property {Object.<string, Object>} userLocales - user defined locales
 * @property {Object.<string, Object>} libLocales - lib locales
 */

/**
 * Form and return error message
 * @param {GetErrorParams} params 
 * @returns {string}
 */
export default function({ validatorConfigValue, validatorConfig, validatorName, fieldName, dataValue, lang, userLocales, libLocales }) {
	let error = '';

	if (isObject(validatorConfig) && ('error' in validatorConfig)) {
		error = validatorConfig.error;
	}

	return error ? error : `${fieldName}: ` + d(validatorName, { e: validatorConfigValue, v: dataValue }, lang, userLocales, libLocales);
}