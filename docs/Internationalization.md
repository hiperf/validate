# Internationalization

Currently ``@hiperf/validate`` out of the box include only english language but
you can define your own translations.

## Example

<<< @/.vitepress/snippets/generated/internationalization-example.js

## Variables inside messages

You can use special variables inside custom locales.

### %e - expected value
This variable is used inside some build in validators like ``min`` or ``minLength``.

### %v - current value
This variable is used inside most build in validators.

### Example
```js
const schema = {
	myValidator: 42
};
const locales = {
	en: {
		myValidator: 'Ultimate answer to everything is "%e", your answer is "%v"'
	}
};
```
