# Fat Fuzzy Validation

This package provides utilities:

- for data validation data using [JSON Schema](https://json-schema.org/) and [AJV](https://ajv.js.org/)
- to sanitize strings

## Usage

### Validation Functions

This package generates functions that use AJV to validate data according to a given JSON Schema.
Each generated function corresponds to a specific use case, although some schema definitions may be shared amongst functions.
Please refer to [JSON Schema](https://json-schema.org/) for more in depth documentation about defining schema.

To generate a new validation function:

- Add the desired schema to `src/in/ajv.schemas.js`
- Update `src/esm/ajv.js` module to include the new schema amongst the generated functions
- Rebuild this package to make the function available by name from :

```js
import validations from '@fat-fuzzy/validation'
const {validate} = validations
const validationFunction = validate[validationFunctionName]
```

You can see a full example of a form validation helper class in `src/example/validate-form.ts`

Additionally, you can see an example with a Svelte component in the package `@fat-fuzzy/ui`: the component `components/recipes/forms/SignUp.svelte` uses the validation function `SignUpValidationFunction` defined here.

## TODO

Expose a way to define schemas externally (i.e. within the apps that use this module)
