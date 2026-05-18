/**
 * Loads and validates the consumer's fat-fuzzy.config.js, if present.
 *
 * Validation is performed by the pre-compiled AJV standalone validator at
 * ./validate.config.mjs — generated from config.schema.json and committed
 * to git. This keeps loadConfig dependency-free at runtime and makes the
 * validator auditable without running any generation step first.
 *
 * Resolution order:
 *   1. FAT_FUZZY_CONFIG env var (absolute or relative to CWD)
 *   2. fat-fuzzy.config.js in CWD
 *   3. fat-fuzzy.config.js walked up to fs root
 *
 * Returns null if no config file is found (built-ins only mode).
 * Throws a descriptive error if a config file is found but fails validation.
 */

import fs from 'fs'
import path from 'path'
import {pathToFileURL} from 'url'
import {ValidateFatFuzzyConfig} from './validate.config.mjs'

// ---------------------------------------------------------------------------
// Types (JSDoc only — no runtime cost)
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} SchemaEntry
 * @property {string}             file        - Resolved absolute path to schema file
 * @property {string}             exportName  - e.g. 'MyFormValidationFunction'
 * @property {string}             $id         - e.g. '#/definitions/MyFormSchema'
 * @property {'extend'|'replace'} mode
 */

/**
 * @typedef {Object} ValidationConfig
 * @property {string}                       schemasDir  - Resolved absolute path
 * @property {string}                       outDir      - Resolved absolute path
 * @property {Record<string, SchemaEntry>}  schemas
 */

/**
 * @typedef {Object} FatFuzzyConfig
 * @property {ValidationConfig} [validation]
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveFromBase(base, p) {
	return path.isAbsolute(p) ? p : path.resolve(base, p)
}

/**
 * Walk up from `start` looking for `filename`. Returns the first match or null.
 * @param {string} start
 * @param {string} filename
 * @returns {string|null}
 */
function findUp(start, filename) {
	let dir = path.resolve(start)
	while (true) {
		const candidate = path.join(dir, filename)
		if (fs.existsSync(candidate)) return candidate
		const parent = path.dirname(dir)
		if (parent === dir) return null
		dir = parent
	}
}

/**
 * Format AJV validation errors into a human-readable message.
 * @param {import('ajv').ErrorObject[]} errors
 * @param {string} configPath
 * @returns {string}
 */
function formatErrors(errors, configPath) {
	const lines = [`fat-fuzzy: invalid config at '${configPath}':`]
	for (const err of errors) {
		const field = err.instancePath || '(root)'
		lines.push(`  ${field}: ${err.message}`)
	}
	return lines.join('\n')
}

/**
 * Resolve and verify filesystem paths within a validated ValidationConfig.
 * JSON Schema can't check whether paths exist on disk, so we do it here.
 *
 * Mutates entries in-place: string paths become resolved absolute paths.
 *
 * @param {object} validation  - The raw validated validation block
 * @param {string} configDir   - Directory containing the config file
 * @returns {ValidationConfig}
 */
function resolveValidationPaths(validation, configDir) {
	const schemasDir = resolveFromBase(configDir, validation.schemasDir)
	const outDir = resolveFromBase(configDir, validation.outDir)

	if (!fs.existsSync(schemasDir)) {
		throw new Error(
			`fat-fuzzy: validation.schemasDir '${schemasDir}' does not exist`,
		)
	}

	const schemas = {}
	for (const [name, entry] of Object.entries(validation.schemas)) {
		const resolvedFile = resolveFromBase(schemasDir, entry.file)
		if (!fs.existsSync(resolvedFile)) {
			throw new Error(
				`fat-fuzzy: validation.schemas.${name}.file not found at '${resolvedFile}'`,
			)
		}
		schemas[name] = {...entry, file: resolvedFile}
	}

	return {schemasDir, outDir, schemas}
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Load the consumer's fat-fuzzy.config.js.
 *
 * @param {object} [options]
 * @param {string} [options.cwd]         - Start directory for file search (default: process.cwd())
 * @param {string} [options.configPath]  - Explicit path, overrides search
 * @returns {Promise<FatFuzzyConfig|null>}
 */
export async function loadConfig({cwd = process.cwd(), configPath} = {}) {
	// 1. Resolve config file path
	const explicitPath = configPath ?? process.env.FAT_FUZZY_CONFIG ?? null
	let resolvedConfigPath

	if (explicitPath) {
		resolvedConfigPath = resolveFromBase(cwd, explicitPath)
		if (!fs.existsSync(resolvedConfigPath)) {
			throw new Error(
				`fat-fuzzy: config file not found at explicit path '${resolvedConfigPath}'`,
			)
		}
	} else {
		resolvedConfigPath = findUp(cwd, 'fat-fuzzy.config.js')
	}

	if (!resolvedConfigPath) {
		return null
	}

	// 2. Import the config module
	let raw
	try {
		const mod = await import(pathToFileURL(resolvedConfigPath).href)
		raw = mod.default ?? mod
	} catch (error) {
		console.log(
			`fat-fuzzy: failed to load config at '${resolvedConfigPath}': ${error.message}`,
		)

		throw error
	}

	// 3. Validate shape with pre-compiled AJV schema validator
	const valid = ValidateFatFuzzyConfig(raw)
	if (!valid) {
		throw new Error(
			formatErrors(ValidateFatFuzzyConfig.errors, resolvedConfigPath),
		)
	}

	// 4. Resolve and verify filesystem paths (schema can't check disk state)
	const configDir = path.dirname(resolvedConfigPath)
	const result = {}

	if (raw.validation !== undefined) {
		result.validation = resolveValidationPaths(raw.validation, configDir)
	}

	return result
}
