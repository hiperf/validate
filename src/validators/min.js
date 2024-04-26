/**
 * Проверка на минимальное значения
 * @param {number} dataValue - входные параметры
 * @param {number} validatorConfigValue - ожидаемое значения
 * @returns {boolean} 
 * @example
 * min(5,7); // result = false
 * min(7,5); // result = true
 */
function min(dataValue, validatorConfigValue) {
	return dataValue >= validatorConfigValue;
}
export default min;