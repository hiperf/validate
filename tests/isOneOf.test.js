import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('isOneOf schema test', () => {
	function f({ validate }) {
		const schema = {
			language: {
				isOneOf: ['C++', 'Python', 'JS']
			}
		};
		const data = {
			language: 'C++'
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('isOneOf schema negative test', () => {
	function f({ validate }) {
		const schema = {
			language: {
				isOneOf: ['C++', 'Python', 'JS']
			}
		};
		const data = {
			language: 'C'
		};
		
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('isOneOf validator test', () => {
	function f({ isOneOf }) {
		// Positive
		expect(isOneOf('Dog', ['Cat','Dog'])).toBe(true);
		
		// Negative
		expect(isOneOf('Mouse', ['Cat','Dog'])).toBe(false);
		expect(isOneOf(true, ['Cat','Dog'])).toBe(false);
		expect(isOneOf(false, ['Cat','Dog'])).toBe(false);
		expect(isOneOf(null, ['Cat','Dog'])).toBe(false);
		expect(isOneOf(1, ['Cat','Dog'])).toBe(false);
		expect(isOneOf(['Cat'], ['Cat','Dog'])).toBe(false);
	}
	f(cjs);
	f(es);
});