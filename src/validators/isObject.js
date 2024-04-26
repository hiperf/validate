/**
 * Проверка на тип object
 * @param {object} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isObject({name:"John"}); // result = true
 * isObject("John"); // result = false
 */
function isObject(dataValue) {
	return typeof dataValue === 'object' &&
		!Array.isArray(dataValue) &&
		dataValue !== null;
}
export default isObject;