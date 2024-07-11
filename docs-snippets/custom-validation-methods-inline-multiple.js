//T import { validate } from '../../dist/es/index.js';
//T import { expect, assert, test } from 'vitest';
//T
//T test('custom-validation-methods-inline-multiple', () => {
//D import { validate } from '@hiperf/validate';

const schema = {
	message: {
		custom: [
			(v) => [
				!/🐈|😺|😸|😻|😽/.test(v) ? 
				'Message should contain cat emoji! 😾' : ''
			],
			(v) => [
				!/🐛|🐝|🐞|🐜|🦗/.test(v) ? 
				'Message should contain at less one bug! 🐸' : ''
			],
		]
	}
};

const data = {
	message: '🐶 woof!'
};

const { isValid, errors } = validate(schema, data);
// isValid = false
// errors = [
//     'Message should contain cat emoji! 😾',
//     'Message should contain at less one bug! 🐸'
// ]

//T
//T assert.isBoolean(isValid);
//T assert.isArray(errors);
//T expect(isValid).toBe(false);
//T expect(errors.length).toBe(2);
//T expect(errors[0]).toBe('Message should contain cat emoji! 😾');
//T expect(errors[1]).toBe('Message should contain at less one bug! 🐸');
//T });
