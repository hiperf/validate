import langs from '../lang/index';

export default function(key, options = {}, lang = 'en') {
	if (!(lang in langs))
		throw new Error(`Lang "${lang}" doesn't exist object langs`);

	if (!(key in langs[lang]))
		throw new Error(`Dictionary key "${key}" does not exist`);

	let result = langs[lang][key];

	for (let key in options) {
		result = result.replace(`%${key}`, options[key]);
	}

	return result;
}