# maxLength
<a name="maxLength"></a>

## maxLength(dataValue, validatorConfigValue) ⇒ <code>boolean</code>
Check for max string length

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>string</code> | input string |
| validatorConfigValue | <code>number</code> | max expected value |

**Example**  
```js
import maxLength from '@hiperf/validate/maxLength';maxLength('John', 5); // falsemaxLength('John', 2); // true
```
