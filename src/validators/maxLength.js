/**
 * Check for max string length
 * @param {string} dataValue - input string
 * @param {number} validatorConfigValue - max expected value
 * @returns {boolean} 
 * @example
 * import maxLength from '@hiperf/validate/maxLength';
 * 
 * maxLength('John', 5); // false
 * maxLength('John', 2); // true
 */
function maxLength(dataValue, validatorConfigValue) {
	return dataValue?.length <= validatorConfigValue;
}
export default maxLength;