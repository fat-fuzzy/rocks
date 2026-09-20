#!/usr/bin/env node

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

const {modulePath, routingPath, hashFilePath} = constants.PATHS

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
	const {schemas, exportMap, ajvOptions} = await mergeSchemas(
		config?.validation ?? null,
	)

	generateValidationConfig(config, {schemas, exportMap, ajvOptions})

	if (config.routing) {
		generateRoutingConfig(config)
	}

	console.log('[@fat-fuzzy/validation] Done.')
}

function generateValidationConfig(
	config /** @FatFuzzyConfig */,
	{schemas, exportMap, ajvOptions},
) {
	console.log(
		`[@fat-fuzzy/validation] Generating validators for: ${Object.keys(exportMap).join(', ')}`,
	)

	// 3. Compile with AJV
	const ajv = new Ajv({
		...AJV_OPTIONS,
		...ajvOptions,
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
	const outDirPath = config.validation.outDir ?? modulePath
	const outDir = path.dirname(outDirPath)
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
}

function generateRoutingConfig(config /** @FatFuzzyConfig */) {
	console.log(`[@fat-fuzzy/validation] Generating routing data `)

	const outDirPath = config.routing.outDir ?? routingPath
	const outDir = path.dirname(outDirPath)
	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir, {recursive: true})
	}

	// If consumer config specifies outDir, write there instead of the default
	const effectiveRoutingPath = config?.routing?.outDir
		? path.join(config.routing.outDir, path.basename(routingPath))
		: routingPath

	if (config?.routing?.outDir && !fs.existsSync(config.routing.outDir)) {
		fs.mkdirSync(config.routing.outDir, {recursive: true})
	}

	fs.writeFileSync(
		effectiveRoutingPath,
		`
		//============================
		//======== NAMESPACES ========
		//============================

		export const NAMESPACES = ${JSON.stringify(config.routing.namespaces)} as const


		// Every top-level namespace key in NAMESPACES, e.g. "docs" | "settings"
		// NOTE : only use for direct indexing of NAMESPACES (e.g. validate according to allowedParams): most app code should use NamespaceId instead
		export type NamespaceKey = keyof typeof NAMESPACES
		
		// Every top-level value in NAMESPACES (i.e. what a NamespaceKey points to)
		export type NamespaceInstance = (typeof NAMESPACES)[NamespaceKey]

		// The \`namespace\` property value for a given namespace entry
		// - currently: value of NamespaceKey === value of NamespaceId
		// - kept as its own type in case that ever changes)
		export type NamespaceId = NamespaceInstance['namespace']

		// The base route path for a namespace, e.g. "/docs" | "/settings"
		export type NamespaceRoute = NamespaceInstance['route']

		// The \`theme\` property value to set the namespace UI color (optional)
		export type NamespaceTheme = NamespaceInstance['theme']

		//========================
		//======== ROUTES ========
		//========================

		// The tuple of route objects belonging to a namespace (one tuple type per namespace, defined as a Union)
		// "tuple" reflects that NAMESPACES's children are fixed constants (via \`as const\`)
		export type Routes = NamespaceInstance['children']

		// A single route object: id + allowedParams, flattened across all namespaces
		export type Route = Routes[number]

		// A Union of all route object ids for a given Namespace
		export type RouteId = Route['id']

		// A Union of all route object names for a given Namespace
    export type RouteNameFor<N extends NamespaceKey> = RouteFor<N>['name']

		// A Union of all route object names, flattened for all Namespaces
		export type RouteName = Route['name']

		// Narrow down to the Route whose \`id\` matches, to get that route's exact shape
		export type RouteById<Id extends RouteId> = Extract<Route, { id: Id }>

		// The route tuple for one specific namespace (not as a Union like Routes, or flattened as Route)
		export type RoutesFor<N extends NamespaceKey> = (typeof NAMESPACES)[N]['children']

		// A single route object scoped to one namespace
		export type RouteFor<N extends NamespaceKey> = RoutesFor<N>[number]

		//============================
		//======= ROUTE PARAMS =======
		//============================

		// A single allowed param for any route, flattened across all routes
		export type AllowedParam = Route['allowedParams'][number]

		// Every param name that exists anywhere in NAMESPACES, e.g. "language" | "format" | "source_tags" | ...
		// Use case: objects or functions that require a valid param name regardless of the route it belongs to
		export type AllowedParamName = AllowedParam['name']

    // The Union of allowedParams for a specific route id
		export type ParamsFor<Id extends RouteId> = RouteById<Id>['allowedParams'][number]
		`,
	)

	console.log(
		`[@fat-fuzzy/validation] Wrote routing data to '${effectiveRoutingPath}'`,
	)
}

generate().catch((error) => {
	console.error('[@fat-fuzzy/validation] Generation failed:', error.message)
	process.exit(1)
})
