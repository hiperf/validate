// validate.js
import create from '@hiperf/validate/create';
import isNumber from '@hiperf/validate/isNumber';

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

export default create({ validators, locales });



