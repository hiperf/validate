# Custom validation methods

You can add custom validation method by using ``custom`` name inside validation schema or pass custom validator inside ``options.validators`` object.


## custom

``custom`` could be function or array of fuctions if you need multiple custom validators.
```js
const schema = {
	message: {
		custom(v) {
			const isValid = /🐈|😺|😸|😻|😽/.test(v);
			const error = [];

			if (!isValid) errors.push('Message should contain cat emoji! 😾');

			return { isValid, error };
		}
	}
};

const data = {
	message: '🐶 woof!'
};

const { isValid, errors } = validate(schema, data);
// isValid = false
// errors = ['Message should contain cat emoji! 😾']
```

## custom (multiple)

Multiple custom validators example.
```js
const schema = {
	message: {
		custom: [
			(v) => [
				!/🐈|😺|😸|😻|😽/.test(v) ? 
				'Message should contain cat emoji! 😾': ''
			],
			(v) => [
				!/🐛|🐝|🐞|🐜|🦗/.test(v) ? 
				'Message should contain at less one bug! 🐸': ''
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
```

::: tip
If you return ``empty string``, ``null``, ``false`` or ``0`` inside errors array, that value will not count as error.
:::


## options.validators 

You can also pass custom validatio method to ``options.validators``.

