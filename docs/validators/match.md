# match
<a name="match"></a>

## match(dataValue, validatorConfigValue) ⇒ <code>boolean</code>
Check if value match regular expression

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataValue | <code>string</code> | input value |
| validatorConfigValue | <code>RegExp</code> | input value, regular expresssion |

**Example**  
```js
import match from '@hiperf/validate/match';match('cat', /🐈/); // falsematch('Hello 🐈', /🐈/); // true
```
