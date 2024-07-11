/**
 * Validate enums
 * @param {string} dataValue - input value
 * @returns {Array} validatorConfigValue - array with allowed values
 * @example
 * import isOneOf from '@hiperf/validate/isOneOf';
 * 
 * isOneOf('Dog', ['Cat','Dog']); // true
 * isOneOf('Mouse', ['Cat','Dog']); // false
 */
function isOneOf(dataValue, validatorConfigValue) {
    return validatorConfigValue.includes(dataValue);
}

export default isOneOf;