import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('isNumber schema test', () => {
	function f({ validate }) {
		const schema = {
			count: {
				isNumber: true
			}
		};
		const data = {
			count: 5
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('isNumber schema negative test', () => {
	function f({ validate }) {
		const schema = {
			count: {
				isNumber: true
			}
		};
		const data = {
			count: '5'
		};
		
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

test('isNumber validator test', () => {
	function f({ isNumber }) {
		// Positive
		expect(isNumber(5), 'Number should return true').toBe(true);
		expect(isNumber(5.5), 'Decimal number should return true').toBe(true);

		// Negative
		expect(isNumber("5"), 'String number should return false').toBe(false);
		expect(isNumber("f"), 'String should return false').toBe(false);
		expect(isNumber(true), 'Boolean should return false').toBe(false);
	}
	f(cjs);
	f(es);
});