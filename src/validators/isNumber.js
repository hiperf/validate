/**
 * Проверка на тип number
 * @param {number} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isNumber(5); // result = true
 * isNumber("John"); // result = false
 */
function isNumber (dataValue) {
    return typeof dataValue == 'number';
}
export default isNumber;