import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('max schema test', () => {
	function f({ validate }) {
		const schema = {
			count: {
				max: 5
			}
		};
		const data = {
			count: 1
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('max schema negative test', () => {
	function f({ validate }) {
		const schema = {
			count: {
				max: 5
			}
		};
		const data = {
			count: 6
		};
		
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('max validator test', () => {
	function f({ max }) {
		// Positive
		expect(max(5,7), '5<=7 should return true').toBe(true);

		// Negative
		expect(max(7,5), '7<=5 should return false').toBe(false);
	}
	f(cjs);
	f(es);
});
