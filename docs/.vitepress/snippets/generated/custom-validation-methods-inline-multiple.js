import { validate } from '@hiperf/validate';

const schema = {
	message: {
		custom: [
			(v) => [
				!/🐈|😺|😸|😻|😽/.test(v) ? 
				'Message should contain cat emoji! 😾' : ''
			],
			(v) => [
				!/🐛|🐝|🐞|🐜|🦗/.test(v) ? 
				'Message should contain at less one bug! 🐸' : ''
			],
		]
	}
};

const data = {
	message: '🐶 woof!'
};

const { isValid, errors } = validate(schema, data);
// isValid = false
// errors = [
//     'Message should contain cat emoji! 😾',
//     'Message should contain at less one bug! 🐸'
// ]


