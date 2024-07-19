
import { expect, assert, test } from 'vitest';

// Default
import { validate as cjs } from './dist/cjs/index';
import { validate as es } from './dist/es/index';

// Slim
import slim_cjs from './dist/cjs/slim';
import slim_es from './dist/es/slim';

// Create
import create_cjs from './dist/cjs/create';
import create_es from './dist/es/create';

// Misc
import { validators } from './dist/es/index';
import { locales } from './dist/es/index';

function positive(validate) {
	const schema = {
		numberTest: {
			custom: [
				function (dataValue) {
					let errors = [];

					if (typeof dataValue != 'number') {
						errors.push('This is not a number');
					} else if (dataValue < 5 || dataValue > 10) {
						errors.push('The number must be from 5 to 10');
					}

					return errors;
				},
				function (dataValue) {
					let errors = [];

					if (dataValue % 1 !== 0) {
						errors.push('The number is not an integer');
					}

					return errors;
				},
			]
		},
		state: {
			isBoolean: true,
		},
		name: {
			match: /^.{3,}$/,
			minLength: 3,
			isString: true,
		},
		email: {
			isEmail: true,
			minLength: 10,
		},
		age: {
			min: 18,
			max: 200,
			isNumber: {
				value: true,
				error: 'Custom isNumber error message',
			},
		},
	};

	const data = {
		numberTest: 6,
		state: true,
		name: 'John',
		email: 'john@example.com',
		age: 33,
	};

	return validate(schema, data, { locales, validators });
}

function negative(validate) {
	const schema = {
		numberTest: {
			custom: [
				function (dataValue) {
					let errors = [];

					if (typeof dataValue != 'number') {
						errors.push('This is not a number');
					} if (dataValue < 5 || dataValue > 10) {
						errors.push('The number must be from 5 to 10');
					}

					return errors;
				},
				function (dataValue) {
					let errors = [];

					if (dataValue % 1 !== 0) {
						errors.push('The number is not an integer');
					}

					return errors;
				},
			]
		},
		state: {
			isBoolean: true,
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
		name: 100,
		email: 'john@example@com',
		age: '33',
	};

	return validate(schema, data, { locales, validators });
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

	const slimValidate_cjs = (schema, data) => slim_cjs(schema, data, {locales, validators});
	const slimValidate_es = (schema, data) => slim_es(schema, data, {locales, validators});
	
	f(slimValidate_cjs);
	f(slimValidate_es);
});

test('Create validate', () => {
	function f(validate) {
		const schema = {
			message: {
				isCatMessage: true,
			}
		};
		
		const data = {
			message: '🐶 woof!'
		};
		
		const { isValid, errors } = validate(schema, data, { validators, locales });

		expect(isValid).toBe(false);
		expect(errors.length, 'errors is not empty').toBe(1);
		expect(errors[0], 'errors should use correct lang').toContain('котики')
	}

	// Create validate
	const computedValidators = Object.assign({
		isCatMessage: v => /🐈|😺|😸|😻|😽/.test(v)
	}, validators);

	const computedLocales = Object.assign({
		en: { 'isCatMessage': 'Message should contain cat emoji! 😾' },
		ru: { 'isCatMessage': 'В сообщение должны содержаться котики! 😾' },
	}, validators);

	const validate_cjs = create_cjs({locales: computedLocales, validators: computedValidators, defaultLang: 'ru'});
	const validate_es = create_es({locales: computedLocales, validators: computedValidators, defaultLang: 'ru'});

	// Run
	f(validate_cjs);
	f(validate_es);
});

test('Custom', () => {
	function f(validate) {
		const validators = {
			isCatMessage: v => /🐈|😺|😸|😻|😽/.test(v)
		};

		const locales = {
			en: { 'isCatMessage': 'Message should contain cat emoji! 😾' }
		};

		const schema = {
			message: {
				isCatMessage: true,
			}
		};
		
		const data = {};
		
		const { isValid, errors } = validate(schema, data, { validators, locales });

		expect(isValid).toBe(false);
		expect(errors.length, 'errors is not empty').toBe(1);
	}
	f(cjs);
	f(es);
});

test('Locales test', () => {
	function f(validate) {
		const validators = {
			isCatMessage: v => /🐈|😺|😸|😻|😽/.test(v)
		};

		const locales = {
			en: { 'isCatMessage': 'Message should contain cat emoji! 😾' },
			ru: { 'isCatMessage': 'В сообщение должны содержаться котики! 😾' },
		};

		const schema = {
			message: {
				isCatMessage: true,
			}
		};
		
		const data = {
			message: '🐶 woof!'
		};
		
		const { isValid, errors } = validate(schema, data, { lang: 'ru', validators, locales });

		expect(isValid).toBe(false);
		expect(errors.length, 'errors is not empty').toBe(1);
		expect(errors[0], 'errors should use correct lang').toContain('котики')
	}
	f(cjs);
	f(es);
});

test('required test', () => {
	function f(validate) {
		const schema = {
			message: { isString: true }
		};
		const data = {};
		
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		expect(errors.length, 'errors is not empty').toBe(1);
		expect(errors[0], 'errors should contain field name').toContain('message')
	}
	f(cjs);
	f(es);
});

test('required false test', () => {
	function f(validate) {
		const schema = {
			message: { isString: true, required: false }
		};
		const data = {};
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		expect(errors.length, 'errors is empty').toBe(0);
	}
	f(cjs);
	f(es);
});
