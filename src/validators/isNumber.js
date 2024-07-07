/**
 * Check if value is Number
 * @param {number} dataValue - input value
 * @returns {boolean} 
 * @example
 * isNumber(5); // true
 * isNumber('f'); // false
 */
function isNumber(dataValue) {
    return typeof dataValue == 'number';
}
export default isNumber;