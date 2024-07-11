import { validate } from '@hiperf/validate';

const validators = {
	isCatMessage: v => /🐈|😺|😸|😻|😽/.test(v)
};

const locales = {
	en: { 'isCatMessage': 'Message should contain cat emoji! 😾' },
	es: { 'isCatMessage': 'El mensaje debe contener emoji de gato.! 😾' },
};

const schema = {
	message: {
		isCatMessage: true,
	}
};

const data = {
	message: '🐶 woof!'
};

const { isValid, errors } = validate(schema, data, { lang: 'es', validators, locales });
// isValid = false
// errors = ['El mensaje debe contener emoji de gato.! 😾']

