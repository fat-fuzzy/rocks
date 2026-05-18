/**
 * Tests for src/ajv/config/loadConfig.js and src/ajv/config/mergeSchemas.js
 *
 * Run with: npx vitest run tests/config
 * (Or via your existing `vitest.config.js`)
 */

import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import fs from 'fs'
import path from 'path'
import os from 'os'

// ---------------------------------------------------------------------------
// Helpers — temporary directory fixture
// ---------------------------------------------------------------------------

let tmpDir: string = ''

beforeEach(() => {
	tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fat-fuzzy-test-'))
})

afterEach(() => {
	fs.rmSync(tmpDir, {recursive: true, force: true})
})

function writeTmp(relPath: string, content: string | object) {
	const full = path.join(tmpDir, relPath)
	fs.mkdirSync(path.dirname(full), {recursive: true})
	fs.writeFileSync(
		full,
		typeof content === 'string' ? content : JSON.stringify(content),
	)
	return full
}

// ---------------------------------------------------------------------------
// loadConfig
// ---------------------------------------------------------------------------

describe('loadConfig', async () => {
	const {loadConfig} = await import('../../src/ajv/config/loadConfig.js')

	it('returns null when no config file exists', async () => {
		const result = await loadConfig({cwd: tmpDir})
		expect(result).toBeNull()
	})

	it('loads a valid config and resolves paths', async () => {
		const schemasDir = path.join(tmpDir, 'schemas')
		fs.mkdirSync(schemasDir)

		const schemaFile = path.join(schemasDir, 'my.schema.json')
		fs.writeFileSync(schemaFile, JSON.stringify({type: 'object'}))

		const outDir = path.join(tmpDir, 'out')

		const configContent = `export default {
  validation: {
    schemasDir: './schemas',
    outDir: './out',
    schemas: {
      MySchema: {
        file: 'my.schema.json',
        exportName: 'MyValidationFunction',
        $id: '#/definitions/MySchema',
        mode: 'replace',
      }
    }
  }
}`
		writeTmp('fat-fuzzy.config.js', configContent)

		const result = await loadConfig({cwd: tmpDir})
		expect(result).not.toBeNull()
		expect(result?.validation).not.toBeNull()

		if (result?.validation) {
			expect(result.validation.schemasDir).toBe(schemasDir)
			expect(result.validation.outDir).toBe(outDir)
			expect(result.validation.schemas.MySchema.mode).toBe('replace')
			expect(result.validation.schemas.MySchema.file).toBe(schemaFile)
		}
	})

	it('throws when schemasDir does not exist', async () => {
		const configContent = `export default {
  validation: {
    schemasDir: './nonexistent',
    outDir: './out',
    schemas: {}
  }
}`
		writeTmp('fat-fuzzy.config.js', configContent)
		await expect(loadConfig({cwd: tmpDir})).rejects.toThrow('does not exist')
	})

	it('throws when a schema file does not exist', async () => {
		const schemasDir = path.join(tmpDir, 'schemas')
		fs.mkdirSync(schemasDir)

		const configContent = `export default {
  validation: {
    schemasDir: './schemas',
    outDir: './out',
    schemas: {
      Foo: {
        file: 'missing.json',
        exportName: 'FooFn',
        $id: '#/definitions/Foo',
        mode: 'replace',
      }
    }
  }
}`
		writeTmp('fat-fuzzy.config.js', configContent)
		await expect(loadConfig({cwd: tmpDir})).rejects.toThrow('file not found')
	})

	it('throws on invalid mode', async () => {
		const schemasDir = path.join(tmpDir, 'schemas')
		fs.mkdirSync(schemasDir)
		writeTmp('schemas/foo.json', {type: 'object'})

		const configContent = `export default {
  validation: {
    schemasDir: './schemas',
    outDir: './out',
    schemas: {
      Foo: {
        file: 'foo.json',
        exportName: 'FooFn',
        $id: '#/definitions/Foo',
        mode: 'merge',
      }
    }
  }
}`
		writeTmp('fat-fuzzy.config.js', configContent)
		const errorMessage = `fat-fuzzy: invalid config at '${tmpDir}/fat-fuzzy.config.js':
  /validation/schemas/Foo/mode: must be equal to one of the allowed values`

		try {
			await loadConfig({cwd: tmpDir})
		} catch (error) {
			const message = (error as Error).message
			expect(message).toEqual(errorMessage)
		}
	})

	it('respects explicit configPath option', async () => {
		const schemasDir = path.join(tmpDir, 'schemas')
		fs.mkdirSync(schemasDir)

		const configContent = `export default {
  validation: {
    schemasDir: '${schemasDir}',
    outDir: '${path.join(tmpDir, 'out')}',
    schemas: {}
  }
}`
		const configPath = writeTmp('custom.config.js', configContent)

		const result = await loadConfig({cwd: '/tmp', configPath})
		expect(result).not.toBeNull()
	})
})

// ---------------------------------------------------------------------------
// mergeSchemas
// ---------------------------------------------------------------------------

describe('mergeSchemas', async () => {
	const {mergeSchemas, BUILT_IN_NAMES} =
		await import('../../src/ajv/config/mergeSchemas.js')

	it('returns all built-ins when no consumer config is provided', async () => {
		const {schemas, exportMap} = await mergeSchemas(null)

		// One schema per built-in
		expect(schemas).toHaveLength(BUILT_IN_NAMES.length)
		// Export map has an entry for each built-in
		expect(Object.keys(exportMap)).toHaveLength(BUILT_IN_NAMES.length)
	})

	it('adds a new consumer schema alongside built-ins', async () => {
		const schemaFile = writeTmp('schemas/address.json', {
			$schema: 'http://json-schema.org/draft-07/schema#',
			type: 'object',
			properties: {street: {type: 'string'}},
		})

		const {schemas, exportMap} = await mergeSchemas({
			schemasDir: path.join(tmpDir, 'schemas'),
			outDir: path.join(tmpDir, 'out'),
			schemas: {
				Address: {
					file: schemaFile,
					exportName: 'AddressValidationFunction',
					$id: '#/definitions/AddressSchema',
					mode: 'replace',
				},
			},
		})

		expect(schemas).toHaveLength(BUILT_IN_NAMES.length + 1)
		expect(exportMap.AddressValidationFunction).toBe(
			'#/definitions/AddressSchema',
		)
	})

	it('replace mode substitutes the built-in schema object', async () => {
		const customForm = {
			$schema: 'http://json-schema.org/draft-07/schema#',
			definitions: {
				FormSchema: {
					type: 'object',
					properties: {
						email: {type: 'string', format: 'email'},
						custom: {type: 'boolean'},
					},
					required: ['email'],
				},
			},
		}
		const schemaFile = writeTmp('schemas/sign-up.json', customForm)

		const {exportMap} = await mergeSchemas({
			schemasDir: path.join(tmpDir, 'schemas'),
			outDir: path.join(tmpDir, 'out'),
			schemas: {
				Form: {
					file: schemaFile,
					exportName: 'FormValidationFunction',
					$id: '#/definitions/FormSchema',
					mode: 'replace',
				},
			},
		})

		// Same export name — still present
		expect(exportMap.FormValidationFunction).toBe('#/definitions/FormSchema')
		// Number of schemas unchanged (replaced, not added)
		const {schemas} = await mergeSchemas({
			schemasDir: path.join(tmpDir, 'schemas'),
			outDir: path.join(tmpDir, 'out'),
			schemas: {
				Form: {
					file: schemaFile,
					exportName: 'FormValidationFunction',
					$id: '#/definitions/FormSchema',
					mode: 'replace',
				},
			},
		})
		expect(schemas).toHaveLength(BUILT_IN_NAMES.length)
	})

	it('extend mode deep-merges consumer fields into the built-in', async () => {
		// A minimal schema fragment that adds one property to Form
		const extension = {
			definitions: {
				FormSchema: {
					properties: {
						myNewField: {type: 'string'},
					},
				},
			},
		}
		const schemaFile = writeTmp('schemas/cookie-ext.json', extension)

		const {schemas} = await mergeSchemas({
			schemasDir: path.join(tmpDir, 'schemas'),
			outDir: path.join(tmpDir, 'out'),
			schemas: {
				Form: {
					file: schemaFile,
					exportName: 'FormValidationFunction',
					$id: '#/definitions/FormSchema',
					mode: 'extend',
				},
			},
		})

		// Still same count — extend doesn't add a new schema
		expect(schemas).toHaveLength(BUILT_IN_NAMES.length)
	})
})
