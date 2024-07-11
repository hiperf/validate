import isNumber from './isNumber';
import isString from './isString';
import isEmail from './isEmail';
import isBoolean from './isBoolean';
import isObject from './isObject';
import isArray from './isArray';
import isOneOf from './isOneOf';
import match from './match';
import min from './min';
import max from './max';
import minLength from './minLength';
import maxLength from './maxLength';
import equal from './equal';

const validators = {
	isNumber,
	isString,
	isEmail,
	isBoolean,
	isObject,
	isArray,
	isOneOf,
	match,
	min,
	max,
	minLength,
	maxLength,
	equal,
};

export default validators;
