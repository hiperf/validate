import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';

test('minLength validator test', () => {
	function f({ minLength }) {
		// Positive
		expect(minLength('John', 2), 'John >= 2 characters should return true').toBe(true);
		expect(minLength('John', 4), 'John >= 4 characters should return true').toBe(true);

		// Negative
		expect(minLength('John', 5), 'John >= 5 characters should return false').toBe(false);
	}
	f(cjs);
	f(es);
});