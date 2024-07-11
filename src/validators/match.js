/**
 * Check if value match regular expression
 * @param {string} dataValue - input value
 * @param {RegExp} validatorConfigValue - input value, regular expresssion
 * @returns {boolean} 
 * @example
 * import match from '@hiperf/validate/match';
 * 
 * match('cat', /🐈/); // false
 * match('Hello 🐈', /🐈/); // true
 */
function match(dataValue, validatorConfigValue) {
	return validatorConfigValue.test(dataValue);
}
export default match;