import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';

test('isDate validator test', () => {
	function f({ isDate }) {
		expect(isDate("2024-04-25"), 'Date should return true').toBe(true);
		expect(isDate("John"), 'String should return true').toBe(false);
	}
	f(cjs);
	f(es);
});