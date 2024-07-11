import create from '../../dist/es/create.js';
import isNumber from '../../dist/es/validators/isNumber.js';
import { expect, assert, test } from 'vitest';

test('create-example-use', () => {
const validators = {
	isNumber,
	isCatMessage: v => /🐈|😺|😸|😻|😽/.test(v)
};
const locales = {
	en: {
		'isNumber': 'Value should be a number',
		'isCatMessage': 'Message should contain cat emoji! 😾'
	}
};
const validate = create({ validators, locales });
// app.js

const schema = {
	year: { isNumber: true }
};
const data = { year: 2000 };
const { isValid, errors } = validate(schema, data);
// isValid = true 
// errors = []

assert.isBoolean(isValid);
assert.isArray(errors);
expect(isValid).toBe(true);
expect(errors.length).toBe(0);
});

