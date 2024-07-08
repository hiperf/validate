export default function(key, options = {}, lang = 'en', locales) {
	if (!(lang in locales))
		throw new Error(`Lang "${lang}" doesn't exist in locales object. Available locales - ${locales.join(', ')}`);

	if (!(key in locales[lang]))
		throw new Error(`Key "${key}" does not exist in "${lang}" dictionary`);

	let result = locales[lang][key];

	for (let key in options) {
		result = result.replace(`%${key}`, options[key]);
	}

	return result;
}