import getError from './utils/getError';
import d from './utils/d';
import isObject from './validators/isObject';

export default function(savedOptions) {
	if (!('locales' in savedOptions)) throw new Error('options.locales is required to be defined');
	if (!('validators' in savedOptions)) throw new Error('options.validators is required to be defined');

	const libLocales = savedOptions.locales;
	const libValidators = savedOptions.validators;
	const defaultLang = savedOptions?.defaultLang || 'en';

	ROLLUP_IMPORT_VALIDATE_CREATE
};