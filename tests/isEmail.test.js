import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';

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