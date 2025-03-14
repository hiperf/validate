# equal
<a name="equal"></a>

## equal(dataValue, validatorConfigValue) ⇒ <code>boolean</code>
Check if value equal to target value

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>\*</code> | input value |
| validatorConfigValue | <code>\*</code> | input value |

**Example**  
```js
import equal from '@hiperf/validate/equal';

equal(true, true); // true
equal(false, false); // true
equal('5', 5); // false
equal(5, '5'); // false
equal(1, true); // false
```
