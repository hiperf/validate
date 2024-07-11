/**
 * Check that number is <= max value
 * @param {number} dataValue - input value
 * @param {number} validatorConfigValue - max expected value
 * @returns {boolean} 
 * @example
 * import max from '@hiperf/validate/max';
 * 
 * max(5,7); // true
 * max(7,5); // false
 */
function max(dataValue, validatorConfigValue) {
	return dataValue <= validatorConfigValue;
}
export default max;