import { validate } from '../../dist/es/index.js';
import { expect, assert, test } from 'vitest';

test('custom-validation-methods-inline', () => {

const schema = {
	message: {
		custom(v) {
			const errors = [];

			if (!/🐈|😺|😸|😻|😽/.test(v))
				errors.push('Message should contain cat emoji! 😾');

			return errors;
		}
	}
};

const data = {
	message: '🐶 woof!'
};

const { isValid, errors } = validate(schema, data);
// isValid = false
// errors = ['Message should contain cat emoji! 😾']

assert.isBoolean(isValid);
assert.isArray(errors);
expect(isValid).toBe(false);
expect(errors.length).toBe(1);
expect(errors[0]).toBe('Message should contain cat emoji! 😾');
});

