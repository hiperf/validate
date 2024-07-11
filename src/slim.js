import getError from './utils/getError';
import d from './utils/d';
import isObject from './validators/isObject';

const libLocales = {};
const libValidators = {};
const defaultLang = 'en';

ROLLUP_IMPORT_VALIDATE_BASE