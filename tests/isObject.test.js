import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';
test('isObject validator test', () => {
	function f({ isObject }) {
		// Positive
		expect(isObject({ name: 'John' }), 'Object should return true').toBe(true);
		expect(isObject({}), 'Empty object should return true').toBe(true);

		// Negative
		expect(isObject('John'), 'String should return false').toBe(false);
		expect(isObject(1), 'Number should return false').toBe(false);
		expect(isObject(true), 'Boolean should return false').toBe(false);
		expect(isObject(null), 'null should return false').toBe(false);
	}
	f(cjs);
	f(es);
});