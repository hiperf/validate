import { expect, test, assert } from 'vitest';
import * as cjs from './dist/cjs/index';
import * as es from './dist/es/index';

test('fieldName property test', () => {
	function f({ validate }) {
		const schema = {
			books: {
				isArray: true,
				fieldName: 'Harry Potter books'
			}
		};
		const data = {
			books: [
				'Harry Potter and the Sorcerer\'s Stone',
				'Harry Potter and the Chamber of Secrets',
				'Harry Potter and the Prisoner of Azkaban'
			]
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(true);
		assert.isEmpty(errors, 'errors should be empty');
	}
	f(cjs);
	f(es);
});

test('fieldName property negative test', () => {
	function f({ validate }) {
		const schema = {
			books: {
				isArray: true,
				fieldName: 'Harry Potter books'
			}
		};
		const data = {
			books: 'Harry Potter and the Sorcerer\'s Stone and other books'
		};

		const { isValid, errors } = validate(schema, data);

		expect(isValid).toBe(false);
		assert.isNotEmpty(errors, 'errors should not be empty');
		expect(errors[0], 'error message should contain field name').toContain(
			schema[Object.keys(schema)[0]].fieldName
		);
	}
	f(cjs);
	f(es);
});