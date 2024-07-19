import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('minLength schema test', () => {
	function f({ validate }) {
		const schema = {
			message: {
				minLength: 5
			}
		};
		const data = {
			message: 'hello'
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('minLength schema negative test', () => {
	function f({ validate }) {
		const schema = {
			message: {
				minLength: 5
			}
		};
		const data = {
			message: 'hell'
		};
		
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('minLength validator test', () => {
	function f({ minLength }) {
		// Positive
		expect(minLength('John', 2), 'John >= 2 characters should return true').toBe(true);
		expect(minLength('John', 4), 'John >= 4 characters should return true').toBe(true);

		// Negative
		expect(minLength('John', 5), 'John >= 5 characters should return false').toBe(false);
	}
	f(cjs);
	f(es);
});