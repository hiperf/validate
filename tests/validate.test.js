
import { expect, assert, test } from 'vitest';
import { validate as cjs } from './dist/cjs/index.js';
import { validate as es } from './dist/es/index.js';

test('json schema validate', () => {
	function f(validate) {
		const schema = {
			numberTest: {
				custom: [
					function (dataValue) {
						let isValid = true;
						let errors = [];

						if (typeof dataValue != 'number') {
							isValid = false;
							errors.push('This is not a number');
							return { isValid, errors };
						}
						if (dataValue < 5 || dataValue > 10) {
							isValid = false;
							errors.push('The number must be from 5 to 10');
						}

						return { isValid, errors };
					},
					function (dataValue) {
						let isValid = true;
						let errors = [];

						if (dataValue % 1 !== 0) {
							isValid = false;
							errors.push('The number is not an integer');
						}
						return { isValid, errors };
					},
				]
			},
			state: {
				isBoolean: true,
			},
			dateValue: {
				isDate: true,
			},
			name: {
				minLength: 3,
				isString: true,
			},
			email: {
				isEmail: true,
				minLength: 10,
			},
			age: {
				min: 18,
				isNumber: {
					value: true,
					error: 'Custom isNumber error message',
				},
			},
		};

		const data = {
			numberTest: 6,
			state: true,
			dateValue: '2024-04-24',
			name: 'John',
			email: 'john@example.com',
			age: 33,
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid, 'isValid type should be boolean').toBeTypeOf('boolean');
		expect(isValid, 'isValid should be true').toBe(true);

		assert.isEmpty(errors, 'errors is empty');
	}
	
	f(cjs);
	f(es);
});
