import { validate } from '@hiperf/validate';

const schema = {
    name: {
        minLength: 3,
        isString: true,
		fieldName: 'Your name' // You can set custom field name that will be displayed in default error messages
    },
    age: {
        min: {
            value: 18,
            error: 'Minimal age is 18 y.o.' // Custom error message
        },
        isNumber: true,
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
    name: 'J',
    age: 15,
    email: 'john.doe.jr@example.com',
	message: '🐶 woof!'
};

const { isValid, errors } = validate(schema, data);
// isValid = false 
// errors = [
//     'Your name: Min length is "3"',
//     'Minimal age is 18 y.o.',
//     'message: Message should contain cat emoji! 😾'
// ]

