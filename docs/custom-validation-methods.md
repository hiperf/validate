# Custom validation methods

You can add custom validation method inline by using ``custom`` name inside validation schema or pass custom validator inside ``options.validators`` object.

## Inline
``custom`` could be function or array of fuctions if you need multiple custom validators.

<<< @/.vitepress/snippets/generated/custom-validation-methods-inline.js

## Inline (multiple)
Multiple custom validators example.

<<< @/.vitepress/snippets/generated/custom-validation-methods-inline-multiple.js

::: tip
If you return ``empty string``, ``null``, ``false`` or ``0`` inside errors array, and that value will not count as error.
:::


## Custom validators

You can also pass custom validator method to ``options.validators``.

<<< @/.vitepress/snippets/generated/custom-validation-custom-validators.js

::: info
Default lang is ``en``, and it's used if you do not specify one inside options object.
:::

