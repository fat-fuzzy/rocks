import SCHEMAS_CONFIG from './src/config/schemas.js'
import NAMESPACES_CONFIG from './src/config/namespaces.js'
/**
 * Chlorophyll schemas config
 */
export default {
	validation: {
		// where the consumer's JSON Schema files live
		schemasDir: 'src/lib/generated/ajv/schemas',

		// where generated files are written
		outDir: 'src/lib/generated/ajv/validation',

		// per-schema: 'extend' merges with built-in, 'replace' fully substitutes it
		// key = built-in schema name, value = { file, exportName, $id, mode }
		schemas: SCHEMAS_CONFIG,
		ajvOptions: {
			removeAdditional: true, // strip unknown fields from user imports
			coerceTypes: true, // "123" → 123, "true" → true
			useDefaults: true, // fill in schema `default` values automatically
		},
	},
	routing: {
		// where generated files are written
		outDir: 'src/lib/generated/types',
		namespaces: NAMESPACES_CONFIG,
	},
}
