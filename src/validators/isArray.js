/**
 * Check if value is Array
 * @param {array} dataValue - input value
 * @returns {boolean} 
 * @example
 * isArray(['John','Bob']); // true
 * isArray('John'); // false
 */
function isArray(dataValue) {
    return Array.isArray(dataValue);
}
export default isArray;
