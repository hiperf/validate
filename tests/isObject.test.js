import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';
test('isObject validator test', () => {
	function f({ isObject }) {
		expect(isObject({ name: "John" }), 'Object should return true').toBe(true);
		expect(isObject("John"), 'String should return false').toBe(false);
	}
	f(cjs);
	f(es);
});