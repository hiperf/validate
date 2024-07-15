import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('isEmail schema test', () => {
	function f({ validate }) {
		const schema = {
			userEmail: {
				isEmail: true
			}
		};
		const data = {
			userEmail: 'user@example.com'
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('isEmail schema negative test', () => {
	function f({ validate }) {
		const schema = {
			userEmail: {
				isEmail: true
			}
		};
		const data = {
			userEmail: 'us@r@example.com'
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('isEmail validator test', () => {
	function f({ isEmail }) {
		// Positive
		expect(isEmail("john@example.com"), 'Email should return true').toBe(true);
		expect(isEmail("john.doe@example.com"), 'Email should return true').toBe(true);

		// Negative
		expect(isEmail(1), 'Number should return false').toBe(false);
		expect(isEmail("John"), 'String should return false').toBe(false);
	}
	f(cjs);
	f(es);
});