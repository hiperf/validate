# minLength
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
import minLenght from '@hiperf/validate/minLenght';

minLenght('John', 5); // false
minLenght('John', 2); // true
```
