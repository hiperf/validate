import { validate } from '../../dist/es/index';
import { expect, assert, test } from 'vitest';

test('internationalization-example', () => {

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


assert.isBoolean(isValid);
assert.isArray(errors);
expect(isValid).toBe(false);
expect(errors.length).toBe(1);
expect(errors[0].indexOf('no es un correo electrónico válido')).not.toBe(-1);
});
