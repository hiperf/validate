import validate from '../../dist/es/slim.js';
import isNumber from '../../dist/es/validators/isNumber.js';
import { expect, assert, test } from 'vitest';

test('slim-example', () => {

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


assert.isBoolean(isValid);
assert.isArray(errors);
expect(isValid).toBe(false);
expect(errors.length).toBe(1);
expect(errors[0].indexOf(locales.en.isNumber)).not.toBe(-1);
});

