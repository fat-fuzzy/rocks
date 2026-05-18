/**
 * @fat-fuzzy/validation Public API
 *
 * In consumer:
 * Declare the schemas and generation options in a `fat-fuzzy.config.js` file (see `src/examples`)
 * Generate custom validation functions from schema using the `ff-validate` command before build.
 * The generated validation functions can then be used as local imports:
 *   import * as validators from './generated/validate.ajv.mjs'
 */

// RUNTIME — used in the browser to sanitize and validate form data.
// import {sanitize} from '@fat-fuzzy/validation'
export {default as sanitize} from './utils/sanitize.js'

// AUTHORING — used at schema-authoring time to compose consumer schemas
// import {schemas} from '@fat-fuzzy/validation'
export {default as schemas} from './ajv/in/ajv.schemas.js'
