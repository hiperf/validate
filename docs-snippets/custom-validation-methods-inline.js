//T import { validate } from '../../dist/es/index.js';
//T import { expect, assert, test } from 'vitest';
//T
//T test('custom-validation-methods-inline', () => {
//D import { validate } from '@hiperf/validate';

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
//T
//T assert.isBoolean(isValid);
//T assert.isArray(errors);
//T expect(isValid).toBe(false);
//T expect(errors.length).toBe(1);
//T expect(errors[0]).toBe('Message should contain cat emoji! 😾');
//T });
