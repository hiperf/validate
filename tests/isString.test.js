import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';
test('isString validator test', () => {
	function f({ isString }) {
		// Positive
		expect(isString('John'), 'String should return true').toBe(true);
		expect(isString('1'), 'String number should return true').toBe(true);
		
		// Negative
		expect(isString(5), 'Number should return false').toBe(false);
		expect(isString(true), 'Boolean should return false').toBe(false);
		expect(isString({}), 'Object should return false').toBe(false);
	}
	f(cjs);
	f(es);
});
