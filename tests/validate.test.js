
import { expect, assert, test } from 'vitest';

// Default
import { validate as cjs } from './dist/cjs/index.js';
import { validate as es } from './dist/es/index.js';

// Slim
import slim_cjs from './dist/cjs/slim.js';
import slim_es from './dist/es/slim.js';

// Create
import create_cjs from './dist/cjs/create.js';
import create_es from './dist/es/create.js';

// Misc
import { validators } from './dist/es/index.js';
import { locales } from './dist/es/index.js';

function positive(validate) {
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

	return validate(schema, data, 'en', {locales, validators});
}

function negative(validate) {
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
		numberTest: '6',
		state: {},
		dateValue: 'abc',
		name: 100,
		email: 'john@example@com',
		age: '33',
	};

	return validate(schema, data, 'en', {locales, validators});
}

test('Validate test', () => {
	function f(validate) {
		const { isValid, errors } = positive(validate);

		expect(isValid, 'isValid type should be boolean').toBeTypeOf('boolean');
		expect(isValid, `isValid should be true. ${errors.toString()}`).toBe(true);

		assert.isEmpty(errors, 'errors is empty');
	}
	f(cjs);
	f(es);
});
test('Validate negative test', () => {
	function f(validate) {
		const { isValid, errors } = negative(validate);

		expect(isValid, 'isValid type should be boolean').toBeTypeOf('boolean');
		expect(isValid, `isValid should be false. ${errors.toString()}`).toBe(false);

		assert.isNotEmpty(errors, 'errors is not empty');
	}
	f(cjs);
	f(es);
});

test('Slim validate', () => {
	function f(validate) {
		const { isValid, errors } = positive(validate);

		expect(isValid, 'isValid type should be boolean').toBeTypeOf('boolean');
		expect(isValid, `isValid should be true. ${errors.toString()}`).toBe(true);

		assert.isEmpty(errors, 'errors is empty');
	}

	const slimValidate_cjs = (schema, data, lang) => slim_cjs(schema, data, lang, {locales, validators});
	const slimValidate_es = (schema, data, lang) => slim_es(schema, data, lang, {locales, validators});
	
	f(slimValidate_cjs);
	f(slimValidate_es);
});

test('Create validate', () => {
	function f(validate) {
		const { isValid, errors } = positive(validate);

		expect(isValid, 'isValid type should be boolean').toBeTypeOf('boolean');
		expect(isValid, `isValid should be true. ${errors.toString()}`).toBe(true);

		assert.isEmpty(errors, 'errors is empty');
	}

	const validate_cjs = create_cjs({locales, validators});
	const validate_es = create_es({locales, validators});

	f(validate_cjs);
	f(validate_es);
});

test('Custom', () => {
	const validate = es;
	//import { validate } from '@repharm/validate';

	const schema = {
		name: {
			minLength: 3,
			isString: true,
			custom(v) {
				const isValid = /^[a-zA-Z-\., ]+$/.test(v);
				const errors = [];

				if (!isValid)
					errors.push('Name can only consist of latin alphabet, ".", ",", "-", or "space" characters');

				return { isValid, errors };
			}
		},
		age: {
			min: {
				value: 18,
				error: 'Minimal age is 18 y.o.'
			},
			isNumber: true
		},
		email: {
			isEmail: true,
		},
	};

	const data = {
		name: 'John Doe, Jr.',
		age: 15,
		email: 'john.doe.jr@example.com',
	};

	const { isValid, errors } = validate(schema, data);

	console.log('validate', isValid, errors);
	
});
