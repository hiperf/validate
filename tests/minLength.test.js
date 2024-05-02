import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';
test('minLength validator test', () => {
	function f({ minLength }) {
		expect(minLength("John",5), 'John > 5 symbol should return false').toBe(false);
		expect(minLength("John",2), 'John > 2 symbol should return true').toBe(true);
	}
	f(cjs);
	f(es);
});