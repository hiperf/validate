import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';

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