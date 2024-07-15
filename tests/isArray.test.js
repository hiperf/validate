import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('isArray schema test', () => {
	function f({ validate }) {
		const schema = {
			names: {
				isArray: true
			}
		};
		const data = {
			names: ['John', 'Mia', 'Felix']
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('isArray schema negative test', () => {
	function f({ validate }) {
		const schema = {
			names: {
				isArray: true
			}
		};
		const data = {
			names: {name: 'John'}
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('isArray validator test', () => {
	function f({ isArray }) {
		// Positive
		expect(isArray(['John', 'Bob']), 'Array should return true').toBe(true);
		expect(isArray([]), 'Empty array should return true').toBe(true);

		// Negative
		expect(isArray('John'), 'String should return false').toBe(false);
		expect(isArray(1), 'Number should return false').toBe(false);
		expect(isArray({}), 'Object should return false').toBe(false);
		expect(isArray(true), 'Boolean should return false').toBe(false);
	}
	f(cjs);
	f(es);
});