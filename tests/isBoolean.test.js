import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';

test('isBoolean validator test', () => {
	function f({ isBoolean }) {
		expect(isBoolean(false, true), 'Boolean should return true').toBe(false);
		expect(isBoolean(true, false), 'Boolean should return true').toBe(false);
		expect(isBoolean(true, true), 'Boolean should return true').toBe(true);
		expect(isBoolean(false, false), 'Boolean should return true').toBe(true);
		expect(isBoolean('a', true), 'Boolean should return true').toBe(false);
	}
	f(cjs);
	f(es);
});