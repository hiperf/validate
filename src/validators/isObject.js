/**
 * Check if value is Object
 * @param {object} dataValue - input value
 * @returns {boolean} 
 * @example
 * import isObject from '@hiperf/validate/isObject';
 * 
 * isObject({name: 'John'}); // true
 * isObject('John'); // false
 */
function isObject(dataValue) {
	return typeof dataValue === 'object' &&
		!Array.isArray(dataValue) &&
		dataValue !== null;
}
export default isObject;