/**
 * This file is used to generate the standalone code used for validation in the browser with Ajv.
 */
const fs = require('fs')
const path = require('path')
const Ajv = require('ajv')
const standaloneCode = require('ajv/dist/standalone').default
const addFormats = require('ajv-formats')
const addErrors = require('ajv-errors')

const schemaForms = require('./ajv.schema.forms.cjs')

// For ESM, the export name needs to be a valid export name, it can not be `export const #/definitions/Foo = ...;` so we
// need to provide a mapping between a valid name and the $id field. Below will generate
// `export const Foo = ...;export const Bar = ...;`
// This mapping would not have been needed if the `$ids` was just `Bar` and `Foo` instead of `#/definitions/Foo`
// and `#/definitions/Bar` respectfully

const AJV_OPTIONS = {
	allErrors: true,
	code: {source: true, esm: true},
}

// Add your Schemas here
const FormInputs = schemaForms.schemaInputs
const SignUpValidator = schemaForms.schemaSignUp
const AjvValidator = schemaForms.schemaAjvValidator
const ajv = new Ajv({
	...AJV_OPTIONS,
	schemas: [FormInputs, SignUpValidator, AjvValidator],
})

addFormats(ajv)
addErrors(ajv)

let moduleCode = standaloneCode(ajv, {
	FormValidationFunction: '#/definitions/AjvValidator', // Validation function for the AjvValidator schema
	SignUpValidationFunction: '#/definitions/SignUpValidator', // Validation function for the SignUpValidator schema
})

// Now you can write the module code to file
fs.writeFileSync(path.join(__dirname, 'ajv.validations.default.js'), moduleCode)
