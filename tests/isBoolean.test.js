import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('isBoolean validator test', () => {
	function f({ isBoolean }) {
		// Positive
		expect(isBoolean(false), 'Boolean should return true').toBe(true);
		expect(isBoolean(true), 'Boolean should return true').toBe(true);

		// Negative
		expect(isBoolean('John'), 'String should return false').toBe(false);
		expect(isBoolean(1), 'Number should return false').toBe(false);
		expect(isBoolean(null), 'null should return false').toBe(false);
	}
	f(cjs);
	f(es);
});