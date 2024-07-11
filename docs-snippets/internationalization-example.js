//T import { validate } from '../../dist/es/index.js';
//T import { expect, assert, test } from 'vitest';
//T
//T test('internationalization-example', () => {
//D import { validate } from '@hiperf/validate';

const locales = {
	es: {
		isEmail: '\"%v\" no es un correo electrónico válido'
	}
};
const schema = {
	email: {
		isEmail: true
	}
};
const data = {
	email: 'd@w.joe@example.com'
};
const { isValid, errors } = validate(schema, data, { lang: 'es', locales });
// isValid = false
// errors = ["d@w.joe@example.com" no es un correo electrónico válido']

//T
//T assert.isBoolean(isValid);
//T assert.isArray(errors);
//T expect(isValid).toBe(false);
//T expect(errors.length).toBe(1);
//T expect(errors[0].indexOf('no es un correo electrónico válido')).not.toBe(-1);
//T });
