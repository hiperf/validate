import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('match schema test', () => {
	function f({ validate }) {
		const schema = {
			message: {
				match: /🐱/
			}
		};
		const data = {
			message: '🐱'
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('match schema negative test', () => {
	function f({ validate }) {
		const schema = {
			message: {
				match: /🐱/
			}
		};
		const data = {
			message: 'cat'
		};
		
		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(Object.keys(data)[0]);
	}
	f(cjs);
	f(es);
});

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
