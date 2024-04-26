/**
 * Проверка на минимальную длину симболов
 * @param {number} dataValue - входные параметры
 * @param {number} validatorConfigValue - ожидаемое значения
 * @returns {boolean} 
 * @example
 * minLenght("John",5); // result = false
 * minLenght("John",2); // result = true
 */
function minLenght(dataValue, validatorConfigValue) {
	return dataValue.length >= validatorConfigValue;
}
export default minLenght;