/**
 * This file is used to generate the standalone code used for validation in the browser with Ajv.
 */

import {createRequire} from 'module'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'

import {loadConfig} from './config/loadConfig.js'
import {mergeSchemas} from './config/mergeSchemas.js'

import utils from '../utils/gpg.js'
import constants from '../utils/constants.js'

const {modulePath, hashFilePath} = constants.PATHS

const require = createRequire(import.meta.url)
const standaloneCode = require('ajv/dist/standalone')

// --------------------------------------
// Internal - not consumer-configurable
// --------------------------------------

const SIG_OPTIONS = {
	gpg: false,
	// detached: true, only set this option if gpg is true
}

// ---------------------------------------------------------------------------
// Same AJV options and require() patches as generate.js — must stay in sync
// ---------------------------------------------------------------------------

const AJV_OPTIONS = {
	allErrors: true,
	$data: true,
	code: {source: true, esm: true},
}

/**
 * Runtime patches for AJV ESM compatibility:
 * - AJV's standalone codegen emits require() calls for these two runtime helpers,
 *  even in ESM mode
 * - We inline the implementations so the output works in browser ESM contexts
 * See ISSUE: https://github.com/eclipsesource/jsonforms/issues/1498#issuecomment-1620136830
 */
const ucs2lengthReplacement = `function(str){const len=str.length;let length=0;let pos=0;let value;while (pos<len){length++;value=str.charCodeAt(pos++);if(value>=0xd800&&value<=0xdbff&&pos<len){value=str.charCodeAt(pos);if((value & 0xfc00)===0xdc00) pos++;}} return length;}`

const equalReplacement = `function r(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){if(e.constructor!==t.constructor)return!1;var f,n,i;if(Array.isArray(e)){if((f=e.length)!=t.length)return!1;for(n=f;0!=n--;)if(!r(e[n],t[n]))return!1;return!0}if(e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(n of e.entries())if(!t.has(n[0]))return!1;for(n of e.entries())if(!r(n[1],t.get(n[0])))return!1;return!0}if(e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(n of e.entries())if(!t.has(n[0]))return!1;return!0}if(ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if((f=e.length)!=t.length)return!1;for(n=f;0!=n--;)if(e[n]!==t[n])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if((f=(i=Object.keys(e)).length)!==Object.keys(t).length)return!1;for(n=f;0!=n--;)if(!Object.prototype.hasOwnProperty.call(t,i[n]))return!1;for(n=f;0!=n--;){var o=i[n];if(!r(e[o],t[o]))return!1}return!0}return e!=e&&t!=t}`

const REPLACEMENTS = [
	{
		search: 'require("ajv/dist/runtime/ucs2length").default',
		replace: () => ucs2lengthReplacement,
	},
	{
		search: 'require("ajv/dist/runtime/equal").default',
		replace: () => equalReplacement,
	},
]

// --------------------------------------
// Generation pipeline
// --------------------------------------
async function generate() {
	// 1. Load consumer config (null = no config file found, use built-ins only)
	const config = await loadConfig()

	if (config) {
		console.log(
			'[@fat-fuzzy/validation] Config loaded — applying consumer schema overrides',
		)
	} else {
		console.log(
			'[@fat-fuzzy/validation] No config found — using built-in schemas only',
		)
	}

	// 2. Merge built-ins with consumer schemas
	const {schemas, exportMap} = await mergeSchemas(config?.validation ?? null)

	console.log(
		`[@fat-fuzzy/validation] Generating validators for: ${Object.keys(exportMap).join(', ')}`,
	)

	// 3. Compile with AJV
	const ajv = new Ajv({
		...AJV_OPTIONS,
		schemas,
	})

	addFormats(ajv)
	addErrors(ajv)

	schemas.forEach((schema) => {
		const metaValid = ajv.validateSchema(schema)
		if (!metaValid) {
			throw Error(`mergeSchemas: failed to merge ${schema.$id}`)
		}
	})

	// 4. Generate standalone ESM module
	let moduleCode = standaloneCode(ajv, exportMap)

	// 5. Apply ESM compatibility patches
	for (const {search, replace} of REPLACEMENTS) {
		moduleCode = moduleCode.replace(search, replace)
	}

	// Guard: catch any remaining require() calls that would break in ESM
	if (moduleCode.indexOf('require(') !== -1) {
		throw new Error(
			'[@fat-fuzzy/validation] Unreplaced require() statement in compiled validator code.\n' +
				'A new AJV runtime helper may need to be added to the REPLACEMENTS list in generate.js.',
		)
	}

	// 6. Write output
	const outDir = path.dirname(modulePath)
	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir, {recursive: true})
	}

	// If consumer config specifies outDir, write there instead of the default
	const effectiveModulePath = config?.validation?.outDir
		? path.join(config.validation.outDir, path.basename(modulePath))
		: modulePath

	const effectiveHashPath = config?.validation?.outDir
		? path.join(config.validation.outDir, path.basename(hashFilePath))
		: hashFilePath

	if (config?.validation?.outDir && !fs.existsSync(config.validation.outDir)) {
		fs.mkdirSync(config.validation.outDir, {recursive: true})
	}

	fs.writeFileSync(effectiveModulePath, moduleCode)
	console.log(
		`[@fat-fuzzy/validation] Wrote validators to '${effectiveModulePath}'`,
	)

	// 7. SHA-256 integrity hash
	const computedHash = crypto
		.createHash('sha256')
		.update(moduleCode)
		.digest('hex')

	fs.writeFileSync(effectiveHashPath, computedHash)

	console.log(
		`[@fat-fuzzy/validation] Wrote integrity hash to '${effectiveHashPath}'`,
	)

	// 8. Optional GPG signing (internal opt-in, not consumer-configurable)
	if (SIG_OPTIONS.gpg) {
		if (SIG_OPTIONS.detached) {
			utils.signHashDetached(computedHash)
		} else {
			utils.signHashNonDetached(computedHash)
		}
	}

	console.log('[@fat-fuzzy/validation] Done.')
}

generate().catch((error) => {
	console.error('[@fat-fuzzy/validation] Generation failed:', error.message)
	process.exit(1)
})
