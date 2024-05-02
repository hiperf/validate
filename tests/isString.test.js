import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';
test('isString validator test', () => {
	function f({ isString }) {
		expect(isString(5), 'Number should return false').toBe(false);
		expect(isString("John"), 'String should return true').toBe(true);
	}
	f(cjs);
	f(es);
});
