export default function(key, options = {}, lang = 'en', userLocales, libLocales) {
	let locale = null;

	// This variant is more performant that using objects merge or array iteration [libLocales, userLocales]
	for (let key in userLocales) {
		if (key == lang) {
			locale = userLocales[key];
			break;
		}
	}
	if (locale === null) {
		for (let key in libLocales) {
			if (key == lang) {
				locale = libLocales[key];
				break;
			}
		}
	}
	
	if (locale === null)
		throw new Error(`Lang "${lang}" doesn't exist in locales object. Available locales - ${Object.keys(libLocales).join(', ')}, {Object.keys(userLocales).join(', ')}`);

	let result = locale[key];

	if (typeof result == 'undefined')
		throw new Error(`Key "${key}" does not exist in "${lang}" dictionary`);

	for (let key in options) {
		result = result.replace(`%${key}`, options[key]);
	}

	return result;
}