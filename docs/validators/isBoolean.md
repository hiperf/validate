# isBoolean
<a name="isBoolean"></a>

## isBoolean(dataValue) ⇒ <code>boolean</code>
Check if value is Boolean

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>boolean</code> | input value |

**Example**  
```js
import isBoolean from '@hiperf/validate/isBoolean';

isBoolean(false); // true
isBoolean(true); // true
isBoolean('John'); // false
isBoolean(1); // false
```
