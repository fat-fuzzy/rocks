/**
 * fat-fuzzy.config.js — example for consumers of @fat-fuzzy/validation
 *
 * Place this file in your project root (or point to it via FAT_FUZZY_CONFIG).
 *
 * All paths are relative to this config file.
 */

export default {
	validation: {
		/**
		 * Directory where your JSON Schema files live.
		 * Can contain .json files or .js/.mjs files with a default export.
		 */
		schemasDir: './src/schemas',

		/**
		 * Where generated validator files are written.
		 * Will be created if it does not exist.
		 * Defaults to the package's own src/ajv/out/ if omitted.
		 */
		outDir: './src/generated',

		/**
		 * Per-schema configuration.
		 *
		 * Keys are built-in schema names (see BUILT_IN_NAMES from mergeSchemas.js
		 * The package defines a Form validation schema for basic but extendable input validation.
		 *
		 * For a key that matches a built-in name:
		 *   mode: 'replace' — your schema entirely replaces the built-in
		 *   mode: 'extend'  — deep-merged on top of the built-in (the consumer's keys overwrite the package defined keys)
		 *
		 * For a key that does NOT match any built-in, a new validator is generated.
		 */
		schemas: {
			// Replace the built-in Form schema entirely
			Form: {
				file: 'form.schema.json',
				exportName: 'FormValidationFunction',
				$id: '#/definitions/FormSchema',
				mode: 'replace',
			},

			// Extend the built-in Form schema (add new fields, etc.)
			FormExtended: {
				file: 'form-extended.schema.json',
				exportName: 'FormExtendedValidationFunction',
				$id: '#/definitions/FormExtendedSchema',
				mode: 'extend',
			},

			// A completely new schema — no built-in with this name
			Address: {
				file: 'address.schema.json',
				exportName: 'AddressValidationFunction',
				$id: '#/definitions/AddressSchema',
				mode: 'replace', // mode is still required, use 'replace' for new schemas
			},
		},
	},
}
