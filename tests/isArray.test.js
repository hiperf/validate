import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';

test('isArray validator test', () => {

	function f({ isArray }) {
		expect(isArray(["John", "Bob"]), 'Array should return true').toBe(true);
		expect(isArray("John"), 'String should return false').toBe(false);
	}
	f(cjs);
	f(es);
});