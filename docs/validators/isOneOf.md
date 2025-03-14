# isOneOf
<a name="isOneOf"></a>

## isOneOf(dataValue) ⇒ <code>Array</code>
Validate enums

**Kind**: global function  
**Returns**: <code>Array</code> - validatorConfigValue - array with allowed values  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>string</code> | input value |

**Example**  
```js
import isOneOf from '@hiperf/validate/isOneOf';

isOneOf('Dog', ['Cat','Dog']); // true
isOneOf('Mouse', ['Cat','Dog']); // false
```
