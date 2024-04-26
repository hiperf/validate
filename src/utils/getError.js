import d from './d';
import isObject from '../validators/isObject';

export default function ({ validatorConfigValue, validatorConfig, validatorName, fieldName, dataValue }) {
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