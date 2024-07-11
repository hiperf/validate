import validate from '@hiperf/validate/slim';
import isNumber from '@hiperf/validate/isNumber';

const validators = { isNumber };
const locales = {
	en: {
		'isNumber': 'Value should be a number'
	}
};
const schema = {
	year: {
		isNumber: true
	}
};
const data = {
	year: '2000'
};

const { isValid, errors } = validate(schema, data, { validators, locales });
// isValid = false 
// errors = ['Value should be a number']


