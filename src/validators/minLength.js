/**
 * Check for min string length
 * @param {string} dataValue - input string
 * @param {number} validatorConfigValue - min expected value
 * @returns {boolean} 
 * @example
 * import minLenght from '@hiperf/validate/minLenght';
 * 
 * minLenght('John', 5); // false
 * minLenght('John', 2); // true
 */
function minLenght(dataValue, validatorConfigValue) {
	return dataValue?.length >= validatorConfigValue;
}
export default minLenght;