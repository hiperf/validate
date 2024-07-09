
# Docs
## validator

## methods
## Functions

<dl>
<dt><a href="#isArray">isArray(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if value is Array</p>
</dd>
<dt><a href="#isBoolean">isBoolean(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if value is Boolean</p>
</dd>
<dt><a href="#isDate">isDate(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if value is Date</p>
</dd>
<dt><a href="#isEmail">isEmail(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if value is Email</p>
</dd>
<dt><a href="#isNumber">isNumber(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if value is Number</p>
</dd>
<dt><a href="#isObject">isObject(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if value is Object</p>
</dd>
<dt><a href="#isString">isString(dataValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if value is String</p>
</dd>
<dt><a href="#min">min(dataValue, validatorConfigValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check that number is &gt;= min value</p>
</dd>
<dt><a href="#minLenght">minLenght(dataValue, validatorConfigValue)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check for min string length</p>
</dd>
</dl>

<a name="isArray"></a>

## isArray(dataValue) ⇒ <code>boolean</code>
Check if value is Array

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>array</code> | input value |

**Example**  
```js
isArray(['John','Bob']); // trueisArray('John'); // false
```
<a name="isBoolean"></a>

## isBoolean(dataValue) ⇒ <code>boolean</code>
Check if value is Boolean

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>boolean</code> | input value |

**Example**  
```js
isBoolean(false); // trueisBoolean(true); // trueisBoolean('John'); // falseisBoolean(1); // false
```
<a name="isDate"></a>

## isDate(dataValue) ⇒ <code>boolean</code>
Check if value is Date

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>string</code> | input value |

**Example**  
```js
isDate('2024-04-25'); // trueisDate('John'); // false
```
<a name="isEmail"></a>

## isEmail(dataValue) ⇒ <code>boolean</code>
Check if value is Email

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>string</code> | input value |

**Example**  
```js
isEmail('John'); // falseisEmail('John@example.com'); // true
```
<a name="isNumber"></a>

## isNumber(dataValue) ⇒ <code>boolean</code>
Check if value is Number

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>number</code> | input value |

**Example**  
```js
isNumber(5); // trueisNumber('f'); // false
```
<a name="isObject"></a>

## isObject(dataValue) ⇒ <code>boolean</code>
Check if value is Object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>object</code> | input value |

**Example**  
```js
isObject({name: 'John'}); // trueisObject('John'); // false
```
<a name="isString"></a>

## isString(dataValue) ⇒ <code>boolean</code>
Check if value is String

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>string</code> | input value |

**Example**  
```js
isString(5); // falseisString('John'); // true
```
<a name="min"></a>

## min(dataValue, validatorConfigValue) ⇒ <code>boolean</code>
Check that number is >= min value

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>number</code> | input value |
| validatorConfigValue | <code>number</code> | min expected value |

**Example**  
```js
min(5,7); // falsemin(7,5); // true
```
<a name="minLenght"></a>

## minLenght(dataValue, validatorConfigValue) ⇒ <code>boolean</code>
Check for min string length

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>string</code> | input string |
| validatorConfigValue | <code>number</code> | min expected value |

**Example**  
```js
minLenght('John', 5); // falseminLenght('John', 2); // true
```

