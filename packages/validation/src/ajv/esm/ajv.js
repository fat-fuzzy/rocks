/**
 * This file is used to generate the standalone code used for validation in the browser with Ajv.
 */

import {createRequire} from 'module'
import fs from 'fs'
import crypto from 'crypto'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import schemas from '../in/ajv.schemas.js'
import utils from '../../utils/gpg.js'
import constants from '../../utils/constants.js'

const {modulePath, hashFilePath} = constants.PATHS

const require = createRequire(import.meta.url)
const standaloneCode = require('ajv/dist/standalone')

// For ESM, the export name needs to be a valid export name, it can not be `export const #/definitions/Foo = ...;` so we
// need to provide a mapping between a valid name and the $id field. Below will generate
// `export const Foo = ...;export const Bar = ...;`
// This mapping would not have been needed if the `$ids` was just `Bar` and `Foo` instead of `#/definitions/Foo`
// and `#/definitions/Bar` respectfully

const SIG_OPTIONS = {
	gpg: false,
	// detached: true, only set this option if gpg is true
}
const AJV_OPTIONS = {
	allErrors: true,
	$data: true,
	code: {source: true, esm: true},
}

// Add your Schemas here
const FormInputs = schemas.schemaInputs
const SignUpSchema = schemas.schemaSignUp
const TestForm = schemas.schemaTestForm
const UiStateSchema = schemas.schemaUiState
const CookiePreferencesSchema = schemas.schemaCookiePreferences
const ajv = new Ajv({
	...AJV_OPTIONS,
	schemas: [
		FormInputs,
		TestForm,
		SignUpSchema,
		UiStateSchema,
		CookiePreferencesSchema,
	],
})

addFormats(ajv)
addErrors(ajv)

/**
 * Generate validation functions for each schema
 */
let moduleCode = standaloneCode(ajv, {
	TestFormValidationFunction: '#/definitions/TestFormSchema',
	SignUpValidationFunction: '#/definitions/SignUpSchema',
	UiStateValidationFunction: '#/definitions/UiStateSchema',
	CookiePreferencesValidationFunction: '#/definitions/CookiePreferencesSchema',
})

/**
 * ISSUE: https://github.com/eclipsesource/jsonforms/issues/1498#issuecomment-1620136830
 */

// see the unminified implementation in ./ucs2length.js
const ucs2lengthReplacement = `function(str){const len=str.length;let length=0;let pos=0;let value;while (pos<len){length++;value=str.charCodeAt(pos++);if(value>=0xd800&&value<=0xdbff&&pos<len){value=str.charCodeAt(pos);if((value & 0xfc00)===0xdc00) pos++;}} return length;}`

// see the unminified implementation in ./equal.js
const equalReplacement = `function r(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){if(e.constructor!==t.constructor)return!1;var f,n,i;if(Array.isArray(e)){if((f=e.length)!=t.length)return!1;for(n=f;0!=n--;)if(!r(e[n],t[n]))return!1;return!0}if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(n of e.entries())if(!t.has(n[0]))return!1;for(n of e.entries())if(!r(n[1],t.get(n[0])))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(n of e.entries())if(!t.has(n[0]))return!1;return!0}if(ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if((f=e.length)!=t.length)return!1;for(n=f;0!=n--;)if(e[n]!==t[n])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if((f=(i=Object.keys(e)).length)!==Object.keys(t).length)return!1;for(n=f;0!=n--;)if(!Object.prototype.hasOwnProperty.call(t,i[n]))return!1;for(n=f;0!=n--;){var o=i[n];if(!r(e[o],t[o]))return!1}return!0}return e!=e&&t!=t}`

const replacements = [
	{
		search: 'require("ajv/dist/runtime/ucs2length").default',
		replace: ucs2lengthReplacement,
	},
	{
		search: 'require("ajv/dist/runtime/equal").default',
		replace: equalReplacement,
	},
]

for (const {search, replace} of replacements) {
	moduleCode = moduleCode.replace(search, replace)
}

// Write the module code to file
fs.writeFileSync(modulePath, moduleCode)

if (moduleCode.indexOf('require(') !== -1) {
	throw new Error('Unreplaced require() statement in compiled validator code')
}

// Calculate hash of the module code for integrity check
const computedHash = crypto
	.createHash('sha256')
	.update(moduleCode)
	.digest('hex')

fs.writeFileSync(hashFilePath, computedHash)

if (SIG_OPTIONS.gpg) {
	if (SIG_OPTIONS.detached) {
		utils.signHashDetached(computedHash)
	} else {
		utils.signHashNonDetached(computedHash)
	}
}
