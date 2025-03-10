/**
 * Check if value is Email
 * @param {string} dataValue - input value
 * @returns {boolean} 
 * @example
 * import isEmail from '@hiperf/validate/isEmail';
 * 
 * isEmail('John'); // false
 * isEmail('John@example.com'); // true
 */
function isEmail(dataValue) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataValue);
}
export default isEmail;