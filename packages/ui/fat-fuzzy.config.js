/**
 *
 */
export default {
	validation: {
		// where the consumer's JSON Schema files live
		schemasDir: 'src/schemas',

		// where generated files are written
		outDir: 'src/lib/generated/ajv',

		// per-schema: 'extend' merges with built-in, 'replace' fully substitutes it
		// key = built-in schema name, value = { file, exportName, $id, mode }
		schemas: {
			SignUp: {
				file: 'sign-up.schema.js',
				exportName: 'SignUpValidationFunction',
				$id: '#/definitions/SignUpSchema',
				mode: 'extend',
			},
			CookiePreferences: {
				file: 'cookie-preferences.schema.js',
				exportName: 'CookiePreferencesValidationFunction',
				$id: '#/definitions/CookiePreferencesSchema',
				mode: 'extend',
			},
			TestForm: {
				file: 'test-form.schema.js',
				exportName: 'TestFormValidationFunction',
				$id: '#/definitions/TestFormSchema',
				mode: 'extend',
			},
		},
	},
}
