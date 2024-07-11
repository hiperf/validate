//T import create from '../../dist/es/create.js';
//T import isNumber from '../../dist/es/validators/isNumber.js';
//T import { expect, assert, test } from 'vitest';
//T
//T test('create-example-create', () => {
// validate.js
//D import create from '@hiperf/validate/create';
//D import isNumber from '@hiperf/validate/isNumber';

const validators = {
	isNumber,
	isCatMessage: v => /🐈|😺|😸|😻|😽/.test(v)
};
const locales = {
	en: {
		'isNumber': 'Value should be a number',
		'isCatMessage': 'Message should contain cat emoji! 😾'
	}
};

//D export default create({ validators, locales });

//T const validate = create({ validators, locales });
//T const schema = {
//T 	year: { isNumber: true }
//T };
//T const data = { year: 2000 };
//T const { isValid, errors } = validate(schema, data);

//T
//T assert.isBoolean(isValid);
//T assert.isArray(errors);
//T expect(isValid).toBe(true);
//T expect(errors.length).toBe(0);
//T });
