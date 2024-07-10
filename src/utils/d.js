export default function(key, options = {}, lang = 'en', userLocales, libLocales) {
	if (!(lang in userLocales) && !(lang in libLocales))
		throw new Error(`Lang "${lang}" doesn't exist in locales object. Available locales - ${Object.keys(libLocales).join(', ')}, {Object.keys(userLocales).join(', ')}`);

	let result = userLocales?.[lang]?.[key] || libLocales?.[lang]?.[key];

	if (typeof result == 'undefined')
		throw new Error(`Key "${key}" does not exist in "${lang}" dictionary`);

	for (let key in options) {
		result = result.replace(`%${key}`, options[key]);
	}

	return result;
}