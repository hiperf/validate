# min
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
import min from '@hiperf/validate/min';min(5,7); // falsemin(7,5); // true
```
