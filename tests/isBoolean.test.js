import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';

test('isBoolean validator test', () => {
	function f({ isBoolean }) {
		// Positive
		expect(isBoolean(false), 'Boolean should return true').toBe(true);
		expect(isBoolean(true), 'Boolean should return true').toBe(true);

		// Negative
		expect(isBoolean('John'), 'String is not Boolean').toBe(false);
		expect(isBoolean(1), 'Number is not Boolean').toBe(false);
	}
	f(cjs);
	f(es);
});