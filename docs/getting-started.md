# Getting started

## Installation

Install ``@hiperf/validate`` with your favorite package manager:

::: code-group

```sh [npm]
npm i @hiperf/validate
```

```sh [yarn]
yarn add @hiperf/validate
```

```sh [pnpm]
pnpm i @hiperf/validate
```

```sh [bun]
bun add @hiperf/validate
```

:::


## Usage

✔️ both ``ESM`` and ``CJS`` modules is supported. 

```js
import { validate } from '@hiperf/validate';

const schema = {
    name: {
        minLength: 3,
        isString: true,
        custom(v) {
            const isValid = /^[a-zA-Z-\., ]+$/.test(v);
            const errors = [];

            if (!isValid) errors.push('Name can only consist of latin alphabet, ".", ",", "-", or "space" characters');

            return { isValid, errors };
        }
    },
    age: {
        min: {
            value: 18,
            error: 'Minimal age is 18 y.o.' // Custom error message
        },
        isNumber: true
    },
    email: {
        isEmail: true,
    },
};

const data = {
    name: 'John Doe, Jr.',
    age: 15,
    email: 'john.doe.jr@example.com',
};

const { isValid, errors } = validate(schema, data);

// isValid = false 
// errors = [ 'Minimal age is 18 y.o.' ]
```