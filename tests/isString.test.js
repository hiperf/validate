import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('isString schema test', () => {
	function f({ validate }) {
		const schema = {
			message: {
				isString: true
			}
		};
		const data = {
			message: 'Hello world'
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('isString schema negative test', () => {
	function f({ validate }) {
		const schema = {
			message: {
				isString: true
			}
		};
		const data = {
			message: true
		};
		
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('isString validator test', () => {
	function f({ isString }) {
		// Positive
		expect(isString('John'), 'String should return true').toBe(true);
		expect(isString('1'), 'String number should return true').toBe(true);
		
		// Negative
		expect(isString(5), 'Number should return false').toBe(false);
		expect(isString(true), 'Boolean should return false').toBe(false);
		expect(isString({}), 'Object should return false').toBe(false);
	}
	f(cjs);
	f(es);
});
