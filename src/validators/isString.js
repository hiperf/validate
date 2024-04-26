/**
 * Проверка на тип string
 * @param {number} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isString(5); // result = false
 * isString("John"); // result = true
 */
function isString(dataValue) {
	return typeof dataValue == 'string';
}
export default isString;