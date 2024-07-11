import { expect, test } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('match validator test', () => {
	function f({ match }) {
		// Positive
		expect(match('Hello 🐈', /🐈/)).toBe(true);

		// Negative
		expect(match('cat', /🐈/)).toBe(false);
		expect(match(true, /🐈/)).toBe(false);
		expect(match(null, /🐈/)).toBe(false);
		expect(match('', /🐈/)).toBe(false);
	}
	f(cjs);
	f(es);
});
