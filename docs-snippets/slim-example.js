//T import validate from '../../dist/es/slim.js';
//T import isNumber from '../../dist/es/validators/isNumber.js';
//T import { expect, assert, test } from 'vitest';
//T
//T test('slim-example', () => {
//D import validate from '@hiperf/validate/slim';
//D import isNumber from '@hiperf/validate/isNumber';

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

//T
//T assert.isBoolean(isValid);
//T assert.isArray(errors);
//T expect(isValid).toBe(false);
//T expect(errors.length).toBe(1);
//T expect(errors[0].indexOf(locales.en.isNumber)).not.toBe(-1);
//T });
