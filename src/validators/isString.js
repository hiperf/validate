/**
 * Check if value is String
 * @param {string} dataValue - input value
 * @returns {boolean} 
 * @example
 * import isString from '@hiperf/validate/isString';
 * 
 * isString(5); // false
 * isString('John'); // true
 */
function isString(dataValue) {
	return typeof dataValue == 'string';
}
export default isString;