# max
<a name="max"></a>

## max(dataValue, validatorConfigValue) ⇒ <code>boolean</code>
Check that number is <= max value

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>number</code> | input value |
| validatorConfigValue | <code>number</code> | max expected value |

**Example**  
```js
import max from '@hiperf/validate/max';

max(5,7); // true
max(7,5); // false
```
