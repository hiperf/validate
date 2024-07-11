import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index.js';
import * as es from './dist/es/index.js';

test('isOneOf validator test', () => {
	console.log('build', Object.keys(es));
	
	function f({ isOneOf }) {
		// Positive
		expect(isOneOf('Dog', ['Cat','Dog'])).toBe(true);
		
		// Negative
		expect(isOneOf('Mouse', ['Cat','Dog'])).toBe(false);
		expect(isOneOf(true, ['Cat','Dog'])).toBe(false);
		expect(isOneOf(false, ['Cat','Dog'])).toBe(false);
		expect(isOneOf(null, ['Cat','Dog'])).toBe(false);
		expect(isOneOf(1, ['Cat','Dog'])).toBe(false);
		expect(isOneOf(['Cat'], ['Cat','Dog'])).toBe(false);
	}
	f(cjs);
	f(es);
});