// app.js
import validate from './validate';

const schema = {
	year: { isNumber: true }
};
const data = { year: 2000 };
const { isValid, errors } = validate(schema, data);
// isValid = true 
// errors = []

