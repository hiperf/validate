/**
 * Проверка на тип boolean и сравнения dataValue c validatorConfigValue
 * @param {boolean} dataValue - входные параметры
 * @param {boolean} validatorConfigValue - ожидаемое значения
 * @returns {boolean} 
 * @example
 * isBoolean(false, true); // result = false
 * isBoolean(true, false); // result = false
 * isBoolean(true, true); // result = true
 * isBoolean(false, false); // result = true
 * isBoolean('a', true); // result = false
 */
function isBoolean (dataValue, validatorConfigValue) {
	return typeof dataValue == 'boolean' && dataValue == validatorConfigValue;
}
export default isBoolean;
