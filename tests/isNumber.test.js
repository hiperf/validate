import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';
test('isNumber validator test', () => {
	function f({ isNumber }) {
		expect(isNumber(5), 'Number should return true').toBe(true);
		expect(isNumber("f"), 'String should return false').toBe(false);
	}
	f(cjs);
	f(es);
});