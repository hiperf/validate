/**
 * Check if value equal to target value
 * @param {*} dataValue - input value
 * @param {*} validatorConfigValue - input value
 * @returns {boolean} 
 * @example
 * import equal from '@hiperf/validate/equal';
 * 
 * equal(true, true); // true
 * equal(false, false); // true
 * equal('5', 5); // false
 * equal(5, '5'); // false
 * equal(1, true); // false
 */
function equal(dataValue, validatorConfigValue) {
	return dataValue === validatorConfigValue;
}
export default equal;