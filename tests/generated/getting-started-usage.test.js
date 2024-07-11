import { validate } from '../../dist/es/index';
import { expect, assert, test } from 'vitest';

test('getting-started-usage', () => {

const schema = {
    name: {
        minLength: 3,
        isString: true,
    },
    age: {
        min: {
            value: 18,
            error: 'Minimal age is 18 y.o.' // Custom error message
        },
        isNumber: true
    },
    email: {
        isEmail: true,
    },
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
    name: 'John Doe, Jr.',
    age: 15,
    email: 'john.doe.jr@example.com',
	message: '🐶 woof!'
};

const { isValid, errors } = validate(schema, data);
// isValid = false 
// errors = [
//     'Minimal age is 18 y.o.',
//     'Message should contain cat emoji! 😾'
// ]


assert.isBoolean(isValid);
assert.isArray(errors);
expect(isValid).toBe(false);
expect(errors.length).toBe(2);
expect(errors[0]).toBe('Minimal age is 18 y.o.');
expect(errors[1]).toBe('Message should contain cat emoji! 😾');
});
