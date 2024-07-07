/**
 * Check that number is >= min value
 * @param {number} dataValue - input value
 * @param {number} validatorConfigValue - min expected value
 * @returns {boolean} 
 * @example
 * min(5,7); // false
 * min(7,5); // true
 */
function min(dataValue, validatorConfigValue) {
	return dataValue >= validatorConfigValue;
}
export default min;