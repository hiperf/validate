/**
 * Проверка на тип email
 * @param {email} dataValue - входные параметры
 * @returns {boolean} 
 * @example
 * isEmail("John"); // result = false
 * isEmail("John@example.com"); // result = true
 */
function isEmail(dataValue) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataValue);
}
export default isEmail;