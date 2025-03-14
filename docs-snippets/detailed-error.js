//T import { validate } from '../../dist/es/index';
//T import { expect, assert, test } from 'vitest';
//T
//T test('getting-started-usage', () => {
//D import { validate } from '@hiperf/validate';

const schema = {
    name: {
        minLength: 3,
        isString: true,
		fieldName: 'Your name'
    },
};

const data = {
    name: 'J',
};

const { isValid, errors } = validate(schema, data, { detailedErrors: true });
// isValid = false 
// errors = [
//     {field: 'name', fieldName: 'Your name', message: 'Min length is "3"'}
// ]

//T
//T assert.isBoolean(isValid);
//T assert.isArray(errors);
//T expect(isValid).toBe(false);
//T expect(errors.length).toBe(1);
//T assert.isObject(errors[0]);
//T assert.containsAllKeys(errors[0], ['field', 'fieldName', 'message'])
//T expect(errors[0].field).toBe('name');
//T expect(errors[0].fieldName).toBe('Your name');
//T expect(errors[0].message).toBe('Min length is "3"');
//T });