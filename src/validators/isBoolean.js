/**
 * Check if value is Boolean
 * @param {boolean} dataValue - input value
 * @returns {boolean} 
 * @example
 * import isBoolean from '@hiperf/validate/isBoolean';
 * 
 * isBoolean(false); // true
 * isBoolean(true); // true
 * isBoolean('John'); // false
 * isBoolean(1); // false
 */
function isBoolean(dataValue) {
	return typeof dataValue == 'boolean';
}
export default isBoolean;
