import { validate } from '@hiperf/validate';

const locales = {
	es: {
		isEmail: '\"%v\" no es un correo electrónico válido'
	}
};
const schema = {
	email: {
		isEmail: true
	}
};
const data = {
	email: 'd@w.joe@example.com'
};
const { isValid, errors } = validate(schema, data, { lang: 'es', locales });
// isValid = false
// errors = ["d@w.joe@example.com" no es un correo electrónico válido']


