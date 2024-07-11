import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('isArray validator test', () => {
	function f({ isArray }) {
		// Positive
		expect(isArray(['John', 'Bob']), 'Array should return true').toBe(true);
		expect(isArray([]), 'Empty array should return true').toBe(true);

		// Negative
		expect(isArray('John'), 'String should return false').toBe(false);
		expect(isArray(1), 'Number should return false').toBe(false);
		expect(isArray({}), 'Object should return false').toBe(false);
		expect(isArray(true), 'Boolean should return false').toBe(false);
	}
	f(cjs);
	f(es);
});