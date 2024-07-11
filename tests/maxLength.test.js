import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('maxLength validator test', () => {
	function f({ maxLength }) {
		// Positive
		expect(maxLength('John', 5), 'John <= 5 characters should return false').toBe(true);
		expect(maxLength('John', 4), 'John <= 4 characters should return true').toBe(true);

		// Negative
		expect(maxLength('John', 2), 'John <= 2 characters should return true').toBe(false);
	}
	f(cjs);
	f(es);
});