/**
 * Check if value is Boolean
 * @param {boolean} dataValue - input value
 * @returns {boolean} 
 * @example
 * isBoolean(false); // true
 * isBoolean(true); // true
 * isBoolean('John'); // false
 * isBoolean(1); // false
 */
function isBoolean(dataValue) {
	return typeof dataValue == 'boolean';
}
export default isBoolean;
