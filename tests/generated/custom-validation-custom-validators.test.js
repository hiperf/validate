import { validate } from '../../dist/es/index';
import { expect, assert, test } from 'vitest';

test('custom-validation-custom-validators', () => {

const validators = {
	isCatMessage: v => /🐈|😺|😸|😻|😽/.test(v)
};

const locales = {
	en: { 'isCatMessage': 'Message should contain cat emoji! 😾' },
	es: { 'isCatMessage': 'El mensaje debe contener emoji de gato.! 😾' },
};

const schema = {
	message: {
		isCatMessage: true,
	}
};

const data = {
	message: '🐶 woof!'
};

const { isValid, errors } = validate(schema, data, { lang: 'es', validators, locales });
// isValid = false
// errors = ['El mensaje debe contener emoji de gato.! 😾']


assert.isBoolean(isValid);
assert.isArray(errors);
expect(isValid).toBe(false);
expect(errors.length).toBe(1);
expect(errors[0].indexOf(locales.es.isCatMessage)).not.toBe(-1);
});
