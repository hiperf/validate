/**
 * Проверка на тип object
 * @param {array} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isArray(["John","Bob"]); // result = true
 * isArray("John"); // result = false
 */
function isArray(dataValue) {
    return Array.isArray(dataValue);
}
export default isArray;
