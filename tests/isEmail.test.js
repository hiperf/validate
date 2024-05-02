import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';

test('isEmail validator test', () => {
	function f({ isEmail }) {
		expect(isEmail("John@example.com"), 'Email should return true').toBe(true);
		expect(isEmail("John"), 'String should return false').toBe(false);
	}
	f(cjs);
	f(es);
});