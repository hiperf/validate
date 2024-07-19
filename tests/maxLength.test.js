import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('maxLength schema test', () => {
	function f({ validate }) {
		const schema = {
			message: {
				maxLength: 5
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

test('maxLength schema negative test', () => {
	function f({ validate }) {
		const schema = {
			message: {
				maxLength: 5
			}
		};
		const data = {
			message: 'hello world'
		};
		
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('maxLength validator test', () => {
	function f({ maxLength }) {
		// Positive
		expect(maxLength('John', 5), 'John <= 5 characters should return false').toBe(true);
		expect(maxLength('John', 4), 'John <= 4 characters should return true').toBe(true);

		// Negative
		expect(maxLength('John', 2), 'John <= 2 characters should return true').toBe(false);
	}
	f(cjs);
	f(es);
});