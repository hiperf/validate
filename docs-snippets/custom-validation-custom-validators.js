//T import { validate } from '../../dist/es/index.js';
//T import { expect, assert, test } from 'vitest';
//T
//T test('custom-validation-custom-validators', () => {
//D import { validate } from '@hiperf/validate';

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

//T
//T assert.isBoolean(isValid);
//T assert.isArray(errors);
//T expect(isValid).toBe(false);
//T expect(errors.length).toBe(1);
//T expect(errors[0].indexOf(locales.es.isCatMessage)).not.toBe(-1);
//T });
