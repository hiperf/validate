import { validate } from '../../dist/es/index';
import { expect, assert, test } from 'vitest';

test('getting-started-usage', () => {

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


assert.isBoolean(isValid);
assert.isArray(errors);
expect(isValid).toBe(false);
expect(errors.length).toBe(1);
assert.isObject(errors[0]);
assert.containsAllKeys(errors[0], ['field', 'fieldName', 'message'])
expect(errors[0].field).toBe('name');
expect(errors[0].fieldName).toBe('Your name');
expect(errors[0].message).toBe('Min length is "3"');
});
