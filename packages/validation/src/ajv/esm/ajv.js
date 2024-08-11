/**
 * This file is used to generate the standalone code used for validation in the browser with Ajv.
 */

import {createRequire} from 'module'
import fs from 'fs'
import crypto from 'crypto'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import schemas from './ajv.schema.forms.js'
import utils from '../../utils/gpg.js'
import constants from '../../utils/constants.js'

const {modulePath, hashFilePath} = constants

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
const SignUpValidator = schemas.schemaSignUp
const AjvValidator = schemas.schemaAjvValidator
const ajv = new Ajv({
	...AJV_OPTIONS,
	schemas: [FormInputs, AjvValidator, SignUpValidator],
})

addFormats(ajv)
addErrors(ajv)

let moduleCode = standaloneCode(ajv, {
	// FormValidationFunction: '#/definitions/AjvValidator', // Validation function for the AjvValidator schema
	SignUpValidationFunction: '#/definitions/SignUpValidator', // Validation function for the SignUpValidator schema
})

/**
 * ISSUE: https://github.com/eclipsesource/jsonforms/issues/1498#issuecomment-1620136830
 */
/**
 *
 * See: https://github.com/mathiasbynens/punycode.js
 * and: https://mathiasbynens.be/notes/javascript-encoding
 */
// const ucs2lengthReplacement = `function (str) {
// 	const len = str.length;
// 	let length = 0;
// 	let pos = 0;
// 	let value;
// 	while (pos < len) {
// 			length++;
// 			value = str.charCodeAt(pos++);
// 			if (value >= 0xd800 && value <= 0xdbff && pos < len) {
// 					value = str.charCodeAt(pos);
// 					if ((value & 0xfc00) === 0xdc00)
// 							pos++;
// 			}
// 	}
// 	return length;
// }`

const ucs2lengthReplacement = `function (str) {const len = str.length;let length = 0;let pos = 0;let value;while (pos < len) {length++;value = str.charCodeAt(pos++);if (value >= 0xd800 && value <= 0xdbff && pos < len) {value = str.charCodeAt(pos);if ((value & 0xfc00) === 0xdc00) pos++;}} return length;}`

const equalReplacement = ` function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};
`
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

// Write the module code to file
fs.writeFileSync(modulePath, moduleCode)

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
