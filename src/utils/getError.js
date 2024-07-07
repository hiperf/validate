import d from './d';
import isObject from '../validators/isObject';

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
export default function({ validatorConfigValue, validatorConfig, validatorName, fieldName, dataValue }) {
	let error = '';

	if (isObject(validatorConfig)) {
		if (!('value' in validatorConfig)) {
			throw new Error('Missing "value" key in validator config');
		}

		if ('error' in validatorConfig) error = validatorConfig.error;
	}

	return error ? error : `${fieldName}: ` + d(`error-${validatorName}`, { e: validatorConfigValue, v: dataValue });
}