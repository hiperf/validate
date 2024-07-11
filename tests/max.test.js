import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

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
