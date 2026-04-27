/**
 * Merges the built-in schema set with consumer-supplied schemas.
 *
 * Each built-in schema has a canonical name (e.g. 'SignUp', 'FormInputs').
 * The consumer config may reference those names with mode 'replace' or 'extend',
 * or introduce entirely new names (implicitly treated as 'replace' of nothing).
 *
 * Result:
 *   - schemas[]   → passed to `new Ajv({ schemas: [...] })`
 *   - exportMap   → passed to `standaloneCode(ajv, exportMap)`
 *                   e.g. { SignUpValidationFunction: '#/definitions/SignUpSchema' }
 */

import fs from 'fs'

// ---------------------------------------------------------------------------
// Built-in registry
//
// Each entry describes one built-in schema. The `load` thunk is called lazily
// so that the built-in barrel file is only imported when actually needed.
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} BuiltInDescriptor
 * @property {() => Promise<object>} load       - Returns the JSON Schema object
 * @property {string}                exportName - Default export name for standaloneCode
 * @property {string}                $id        - The schema's $id / definitions key
 */

/** @type {Record<string, BuiltInDescriptor>} */
const BUILT_INS = {
	Form: {
		load: async () => (await import('../in/ajv.schemas.js')).default.schemaForm,
		exportName: 'FormValidationFunction',
		$id: '#/definitions/FormSchema',
	},
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Load a consumer schema from disk. Supports .json and .js/.mjs files.
 * @param {string} filePath  - Absolute path (already resolved by loadConfig)
 * @returns {Promise<object>}
 */
async function loadConsumerSchema(filePath) {
	if (filePath.endsWith('.json')) {
		const raw = fs.readFileSync(filePath, 'utf8')
		try {
			return JSON.parse(raw)
		} catch (error) {
			console.log(
				`mergeSchemas: failed to parse JSON at '${filePath}': ${error.message}`,
			)

			throw error
		}
	}

	// .js / .mjs — dynamic import
	const {pathToFileURL} = await import('url')
	try {
		const mod = await import(pathToFileURL(filePath).href)
		return mod.default ?? mod
	} catch (error) {
		console.log(
			`mergeSchemas: failed to import '${filePath}': ${error.message}`,
		)

		throw error
	}
}

/**
 * Deep-merge two plain objects. Arrays and primitive values from `override`
 * win over `base`. This is intentionally shallow at the top level but
 * recurses into nested objects — suitable for JSON Schema merging where
 * you might want to extend `properties` without losing other keywords.
 *
 * @param {object} base
 * @param {object} override
 * @returns {object}
 */
function deepMerge(base, override) {
	const result = {...base}
	for (const [key, val] of Object.entries(override)) {
		if (
			val !== null &&
			typeof val === 'object' &&
			!Array.isArray(val) &&
			typeof result[key] === 'object' &&
			result[key] !== null &&
			!Array.isArray(result[key])
		) {
			result[key] = deepMerge(result[key], val)
		} else {
			result[key] = val
		}
	}
	return result
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} MergeResult
 * @property {object[]}               schemas    - Final schema array for AJV
 * @property {Record<string,string>}  exportMap  - { exportName: $id } for standaloneCode
 */

/**
 * Build the final schema list and export map by merging built-ins with
 * consumer-supplied overrides.
 *
 * @param {import('./loadConfig.js').ValidationConfig|null} validationConfig
 * @returns {Promise<MergeResult>}
 */
export async function mergeSchemas(validationConfig) {
	// Start with all built-ins loaded
	const builtInEntries = await Promise.all(
		Object.entries(BUILT_INS).map(async ([name, descriptor]) => ({
			name,
			schema: await descriptor.load(),
			exportName: descriptor.exportName,
			$id: descriptor.$id,
			active: true, // will be set false if consumer replaces it
		})),
	)

	// Index by name for O(1) lookup
	const byName = Object.fromEntries(builtInEntries.map((e) => [e.name, e]))

	// Consumer additions / overrides
	const consumerExtras = [] // new schemas not present in built-ins

	if (validationConfig?.schemas) {
		for (const [name, entry] of Object.entries(validationConfig.schemas)) {
			const consumerSchema = await loadConsumerSchema(entry.file)

			if (byName[name]) {
				// Known built-in — apply mode
				if (entry.mode === 'replace') {
					byName[name].schema = consumerSchema
					byName[name].exportName = entry.exportName
					byName[name].$id = entry.$id
				} else {
					// extend: deep-merge consumer on top of built-in
					byName[name].schema = deepMerge(byName[name].schema, consumerSchema)
					// Allow consumer to rename the export / $id if they want
					byName[name].exportName = entry.exportName
					byName[name].$id = entry.$id
				}
			} else {
				// Brand-new schema (no built-in with this name)
				consumerExtras.push({
					name,
					schema: consumerSchema,
					exportName: entry.exportName,
					$id: entry.$id,
					active: true,
				})
			}
		}
	}

	const allEntries = [...builtInEntries, ...consumerExtras]

	const schemas = allEntries.map((e) => e.schema)
	const exportMap = Object.fromEntries(
		allEntries.map((e) => [e.exportName, e.$id]),
	)

	return {schemas, exportMap}
}

/**
 * Expose built-in names so callers (and tests) can reference them without
 * importing the full barrel.
 */
export const BUILT_IN_NAMES = Object.keys(BUILT_INS)
