import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('equal schema test', () => {
	function f({ validate }) {
		const schema = {
			letter: { equal: 'a' }
		};
		const data = { letter: 'a' };
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('equal schema negative test', () => {
	function f({ validate }) {
		const schema = {
			letter: { equal: 'a' }
		};
		const data = { letter: 'b' };
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('equal validator test', () => {
	function f({ equal }) {
		// Positive
		expect(equal(true, true)).toBe(true);
		expect(equal(false, false)).toBe(true);
		expect(equal(1, 1)).toBe(true);

		// Negative
		expect(equal('5', 5)).toBe(false);
		expect(equal(5, '5')).toBe(false);
		expect(equal(1, true)).toBe(false);
	}
	f(cjs);
	f(es);
});
