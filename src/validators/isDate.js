// todo: validator function is very primitive, need more advance check

/**
 * Check if value is Date
 * @param {string} dataValue - input value
 * @returns {boolean} 
 * @example
 * isDate('2024-04-25'); // true
 * isDate('John'); // false
 */
function isDate(dataValue) {
	return !isNaN(Date.parse(dataValue));
}
export default isDate;