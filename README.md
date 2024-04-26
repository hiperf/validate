
# Документация validator
## Функция
<a name="validate"></a>

## validate(schema, data, [lang]) ⇒ <code>validate\_result</code>
json schema validator

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| schema | <code>Object</code> |  | схема валидации |
| data | <code>Object</code> |  | входные параметры |
| [lang] | <code>string</code> | <code>&quot;en&quot;</code> | язык вывода ошибок |

**Example**  
```js
const schema = {  name: {  	minLength: 3,  	isString: true  },  email: {  	isEmail: true  },  age: {  	min: 18,  	isNumber: {  		value: true,  		error: 'Custom isNumber error message'  	},  },};const data = {  name: 'John',  email: 'john@example.com',  age: 33,};const { isValid, errors } = validator(schema, data);
```

## Методы
## Functions

<dl>
<dt><a href="#isArray">isArray(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Проверка на тип object</p>
</dd>
<dt><a href="#isBoolean">isBoolean(dataValue, validatorConfigValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Проверка на тип boolean и сравнения dataValue c validatorConfigValue</p>
</dd>
<dt><a href="#isDate">isDate(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Проверка на тип даты</p>
</dd>
<dt><a href="#isEmail">isEmail(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Проверка на тип email</p>
</dd>
<dt><a href="#isNumber">isNumber(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Проверка на тип number</p>
</dd>
<dt><a href="#isObject">isObject(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Проверка на тип object</p>
</dd>
<dt><a href="#isString">isString(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Проверка на тип string</p>
</dd>
<dt><a href="#min">min(dataValue, validatorConfigValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Проверка на минимальное значения</p>
</dd>
<dt><a href="#minLenght">minLenght(dataValue, validatorConfigValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Проверка на минимальную длину симболов</p>
</dd>
</dl>

<a name="isArray"></a>

## isArray(dataValue) ⇒ <code>boolean</code>
Проверка на тип object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>array</code> | входные параметры |

**Example**  
```js
isArray(["John","Bob"]); // result = trueisArray("John"); // result = false
```
<a name="isBoolean"></a>

## isBoolean(dataValue, validatorConfigValue) ⇒ <code>boolean</code>
Проверка на тип boolean и сравнения dataValue c validatorConfigValue

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>boolean</code> | входные параметры |
| validatorConfigValue | <code>boolean</code> | ожидаемое значения |

**Example**  
```js
isBoolean(false, true); // result = falseisBoolean(true, false); // result = falseisBoolean(true, true); // result = trueisBoolean(false, false); // result = trueisBoolean('a', true); // result = false
```
<a name="isDate"></a>

## isDate(dataValue) ⇒ <code>boolean</code>
Проверка на тип даты

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>string</code> | входные параметры |

**Example**  
```js
isDate("2024-04-25"); // result = trueisDate("John"); // result = false
```
<a name="isEmail"></a>

## isEmail(dataValue) ⇒ <code>boolean</code>
Проверка на тип email

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>email</code> | входные параметры |

**Example**  
```js
isEmail("John"); // result = falseisEmail("John@example.com"); // result = true
```
<a name="isNumber"></a>

## isNumber(dataValue) ⇒ <code>boolean</code>
Проверка на тип number

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>number</code> | входные параметры |

**Example**  
```js
isNumber(5); // result = trueisNumber("John"); // result = false
```
<a name="isObject"></a>

## isObject(dataValue) ⇒ <code>boolean</code>
Проверка на тип object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>object</code> | входные параметры |

**Example**  
```js
isObject({name:"John"}); // result = trueisObject("John"); // result = false
```
<a name="isString"></a>

## isString(dataValue) ⇒ <code>boolean</code>
Проверка на тип string

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>number</code> | входные параметры |

**Example**  
```js
isString(5); // result = falseisString("John"); // result = true
```
<a name="min"></a>

## min(dataValue, validatorConfigValue) ⇒ <code>boolean</code>
Проверка на минимальное значения

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>number</code> | входные параметры |
| validatorConfigValue | <code>number</code> | ожидаемое значения |

**Example**  
```js
min(5,7); // result = falsemin(7,5); // result = true
```
<a name="minLenght"></a>

## minLenght(dataValue, validatorConfigValue) ⇒ <code>boolean</code>
Проверка на минимальную длину симболов

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>number</code> | входные параметры |
| validatorConfigValue | <code>number</code> | ожидаемое значения |

**Example**  
```js
minLenght("John",5); // result = falseminLenght("John",2); // result = true
```

