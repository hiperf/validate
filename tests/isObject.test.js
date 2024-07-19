import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('isObject schema test', () => {
	function f({ validate }) {
		const schema = {
			user: {
				isObject: true
			}
		};
		const data = {
			user: {
				name: 'John'
			}
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('isObject schema negative test', () => {
	function f({ validate }) {
		const schema = {
			user: {
				isObject: true
			}
		};
		const data = {
			user: ['John']
		};
		
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('isObject validator test', () => {
	function f({ isObject }) {
		// Positive
		expect(isObject({ name: 'John' }), 'Object should return true').toBe(true);
		expect(isObject({}), 'Empty object should return true').toBe(true);

		// Negative
		expect(isObject('John'), 'String should return false').toBe(false);
		expect(isObject(1), 'Number should return false').toBe(false);
		expect(isObject(true), 'Boolean should return false').toBe(false);
		expect(isObject(null), 'null should return false').toBe(false);
	}
	f(cjs);
	f(es);
});