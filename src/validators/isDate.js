/**
 * Проверка на тип даты
 * @param {string} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isDate("2024-04-25"); // result = true
 * isDate("John"); // result = false
 */
function isDate(dataValue) {
	return !isNaN(Date.parse(dataValue));
}
export default isDate;