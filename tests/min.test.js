import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('min validator test', () => {
	function f({ min }) {
		// Positive
		expect(min(7,5), '7>5 should return true').toBe(true);

		// Negative
		expect(min(5,7), '5>7 should return false').toBe(false);
	}
	f(cjs);
	f(es);
});
