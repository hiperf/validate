import { validate } from '@hiperf/validate';

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

