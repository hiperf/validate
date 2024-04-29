
import { expect, test } from 'vitest';
import { validate as validate_cjs } from './dist/cjs/index.js';
import { validate as validate_es } from './dist/es/index.js';

test('json schema validate', () => {
	function f(validator) {
		//Bug: на массив с обектами
		const schema = {
			numberTest: {
				custom: [
					function(dataValue) {
						let isValid=true;
						let errors = [];
						if(typeof dataValue != 'number')
						{
							isValid=false;
							errors.push("This is not a number");
							return {isValid,errors};
						}
						if(dataValue<5 || dataValue>10)
						{
							isValid=false;
							errors.push("The number must be from 5 to 10");
						}
						return {isValid,errors};
					},
					function(dataValue) {
						let isValid=true;
						let errors = [];
						if(dataValue % 1 !== 0)
						{
							isValid=false;
							errors.push("The number is not an integer");
						}
						return {isValid,errors};
					},
				]
			},
			state: {
				isBoolean: true,
			},
			date_value: {
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
			date_value: '2024-04-24',
			name: 'John',
			email: 'john@example.com',
			age: 33,
		};

		const { isValid, errors } = validator(schema, data);

		console.log('isValid', isValid);
		console.log('errors', errors);

		expect(isValid, 'isValid type is boolean').toBeTypeOf('boolean');
		expect(isValid, 'isValid to be true').toBe(true);

		if (isValid == true) {
			expect(errors.length == 0, 'errors is empty').toBe(true);
		} else {
			expect(errors.length == 0, 'errors is not empty').toBe(false);
		}
	}
	f(validate_cjs);
	f(validate_es);
});
