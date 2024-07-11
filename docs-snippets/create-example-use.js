//T import create from '../../dist/es/create.js';
//T import isNumber from '../../dist/es/validators/isNumber.js';
//T import { expect, assert, test } from 'vitest';
//T
//T test('create-example-use', () => {
//T const validators = {
//T 	isNumber,
//T 	isCatMessage: v => /🐈|😺|😸|😻|😽/.test(v)
//T };
//T const locales = {
//T 	en: {
//T 		'isNumber': 'Value should be a number',
//T 		'isCatMessage': 'Message should contain cat emoji! 😾'
//T 	}
//T };
//T const validate = create({ validators, locales });
// app.js
//D import validate from './validate';

const schema = {
	year: { isNumber: true }
};
const data = { year: 2000 };
const { isValid, errors } = validate(schema, data);
// isValid = true 
// errors = []
//T
//T assert.isBoolean(isValid);
//T assert.isArray(errors);
//T expect(isValid).toBe(true);
//T expect(errors.length).toBe(0);
//T });
