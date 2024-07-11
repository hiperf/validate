import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

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
