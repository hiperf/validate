const e={en:{"error-min":'Min value should be "%e", current value is "%v"',"error-isNumber":'Value "%v" should be number',"error-isString":'Value "%v" should be string',"error-isEmail":'"%v" is not a valid email',"error-isDate":'"%v" is not a valid date',"error-minLength":'Min length should be "%e"',"error-isBoolean":'Value "%v" is not boolean or not equal "%e"',"error-validator-config-is-missing-value":'Validator "%v" config is an object, "value" key is required',"error-unknown-validator":'Unknown validator "%v", make sure you incuded this validator'}};function r(e,r){return e>=r}function i(e,r){return e.length>=r}function n(e){return"number"==typeof e}function o(e){return"string"==typeof e}function t(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function a(e){return"boolean"==typeof e}function l(e){return!isNaN(Date.parse(e))}function s(e){return"object"==typeof e&&!Array.isArray(e)&&null!==e}function u(e){return Array.isArray(e)}const c={min:r,minLength:i,isNumber:n,isString:o,isEmail:t,isBoolean:a,isDate:l,isObject:s,isArray:u};function f(e,r={},i="en",n,o){let t=null;for(let e in n)if(e==i){t=n[e];break}if(null===t)for(let e in o)if(e==i){t=o[e];break}if(null===t)throw new Error(`Lang "${i}" doesn't exist in locales object. Available locales - ${Object.keys(o).join(", ")}, {Object.keys(userLocales).join(', ')}`);let a=t[e];if(void 0===a)throw new Error(`Key "${e}" does not exist in "${i}" dictionary`);for(let e in r)a=a.replace(`%${e}`,r[e]);return a}function d({validatorConfigValue:e,validatorConfig:r,validatorName:i,fieldName:n,dataValue:o,lang:t,userLocales:a,libLocales:l}){let u="";if(s(r)){if(!("value"in r))throw new Error('Missing "value" key in validator config');"error"in r&&(u=r.error)}return u||`${n}: `+f(`error-${i}`,{e:e,v:o},t,a,l)}const v=["required"];function g(e,r={},i={}){return e in r?r[e]:e in i?i[e]:null}function b(r,i,n="en",o={}){let t=[];"locales"in o||(o.locales={}),"validators"in o||(o.validators={});for(let a in r){const l=r[a],s=!("required"in l)||l.required;let u;if(i.hasOwnProperty(a)){u=i[a];for(let r in l){if(v.includes(r))continue;const i=g(r,o.validators,c);if(!i&&"custom"!=r)throw new Error(f("error-unknown-validator",{v:r},n,o.locales,e));const s=l[r];let b=s;if(g("isObject",o.validators,c)(s)){if(!("value"in s))throw new Error(f("error-validator-config-is-missing-value",{v:r},n,o.locales,e));b=s.value}if("custom"===r){const e=Array.isArray(s)?s:[s];for(let r of e){const e=r(u);for(let r of e.errors)t.push(r)}}else{if(!i(u,b,s)){const i=d({validatorConfigValue:b,validatorConfig:s,validatorName:r,fieldName:a,dataValue:u,lang:n,userLocales:o.locales,libLocales:e});t.push(i)}}}}else s&&t.push(f("field-required",{fieldName:a},n,o.locales,e))}return{isValid:0===t.length,errors:t}}export{u as isArray,a as isBoolean,l as isDate,t as isEmail,n as isNumber,s as isObject,o as isString,e as locales,r as min,i as minLength,b as validate,c as validators};
