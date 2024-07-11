import { validate } from '../../dist/es/index.js';
import { expect, assert, test } from 'vitest';

test('custom-validation-methods-inline-multiple', () => {

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


assert.isBoolean(isValid);
assert.isArray(errors);
expect(isValid).toBe(false);
expect(errors.length).toBe(2);
expect(errors[0]).toBe('Message should contain cat emoji! 😾');
expect(errors[1]).toBe('Message should contain at less one bug! 🐸');
});

