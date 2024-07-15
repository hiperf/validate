import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('isBoolean schema test', () => {
	function f({ validate }) {
		const schema = {
			state: {
				isBoolean: true
			}
		};
		const data = {
			state: true
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('isBoolean schema negative test', () => {
	function f({ validate }) {
		const schema = {
			state: {
				isBoolean: true
			}
		};
		const data = {
			state: 0
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('isBoolean validator test', () => {
	function f({ isBoolean }) {
		// Positive
		expect(isBoolean(false), 'Boolean should return true').toBe(true);
		expect(isBoolean(true), 'Boolean should return true').toBe(true);

		// Negative
		expect(isBoolean('John'), 'String should return false').toBe(false);
		expect(isBoolean(1), 'Number should return false').toBe(false);
		expect(isBoolean(null), 'null should return false').toBe(false);
	}
	f(cjs);
	f(es);
});