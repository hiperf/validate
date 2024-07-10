function r(r,e={},o="en",i,a){if(!(o in i)&&!(o in a))throw new Error(`Lang "${o}" doesn't exist in locales object. Available locales - ${Object.keys(a).join(", ")}, {Object.keys(userLocales).join(', ')}`);let l=i?.[o]?.[r]||a?.[o]?.[r];if(void 0===l)throw new Error(`Key "${r}" does not exist in "${o}" dictionary`);for(let r in e)l=l.replace(`%${r}`,e[r]);return l}function e({validatorConfigValue:e,validatorConfig:o,validatorName:i,fieldName:a,dataValue:l,lang:t,userLocales:n,libLocales:s}){let u="";if(function(r){return"object"==typeof r&&!Array.isArray(r)&&null!==r}(o)){if(!("value"in o))throw new Error('Missing "value" key in validator config');"error"in o&&(u=o.error)}return u||`${a}: `+r(`error-${i}`,{e:e,v:l},t,n,s)}const o={},i={};function a(r,e={},o={}){return r in e?e[r]:r in o?o[r]:null}function l(l,t,n="en",s={}){let u=[];"locales"in s||(s.locales={}),"validators"in s||(s.validators={});for(let f in l){const c=l[f],d=!("required"in c)||c.required;let v;if(t.hasOwnProperty(f)){v=t[f];for(let l in c){if("required"==l)continue;const t=a(l,s.validators,i);if(!t&&"custom"!=l)throw new Error(r("error-unknown-validator",{v:l},n,s.locales,o));const d=c[l];let y=d;if(a("isObject",s.validators,i)(d)){if(!("value"in d))throw new Error(r("error-validator-config-is-missing-value",{v:l},n,s.locales,o));y=d.value}if("custom"===l){const r=Array.isArray(d)?d:[d];for(let e of r){const r=e(v);if(!Array.isArray(r))throw new Error(`Custom validator (field: ${f}): Custom validator should return array of errors. Got - ${typeof r}`);for(let e of r)""!==e&&u.push(e)}}else t(v,y,d)||u.push(e({validatorConfigValue:y,validatorConfig:d,validatorName:l,fieldName:f,dataValue:v,lang:n,userLocales:s.locales,libLocales:o}))}}else d&&u.push(r("field-required",{fieldName:f},n,s.locales,o))}return{isValid:0===u.length,errors:u}}export{l as default};
