import {describe, test, expect} from 'vitest'

import {isRawSchema} from '#lib/common/transform/raw-to-typed.js'
import {migrate} from '#lib/common/migrate-schemas/engine.js'

import {SEED_DOC} from '#tests/fixtures/seed.js'
import {DOC_STORE} from '#tests/fixtures/doc.js'
import {SCHEMA_VERSION} from '#config/setup.js'

describe('migrate-schemas/engine.ts - JSON Schema migration engine', () => {
	test(`migration up: 0.1 to ${SCHEMA_VERSION}`, () => {
		const targetVersion = SCHEMA_VERSION
		const migrated = migrate(SEED_DOC, targetVersion)

		expect(migrated.status).toBe('migrated')
		expect(isRawSchema(migrated.record)).toBe(true)

		if (isRawSchema(migrated.record)) {
			expect(migrated.record.schema_version).toBe(targetVersion)
		}
	})

	test('migration up: 0.1 to 0.1', () => {
		const targetVersion = 0.1
		const sourceSchema = SEED_DOC
		const sourceVersion = SEED_DOC.schema_version

		const migrated = migrate(sourceSchema, targetVersion)

		expect(migrated.status).toBe('migrated')
		expect(isRawSchema(migrated.record)).toBe(true)

		if (isRawSchema(migrated.record)) {
			expect(migrated.record.schema_version).toBe(sourceVersion)
		}
	})

	test('migration up: 1 to 1', () => {
		const targetVersion = 1
		const sourceSchema = DOC_STORE.en?.long
		const sourceVersion = sourceSchema?.schema_version

		const migrated = migrate(sourceSchema, targetVersion)

		expect(migrated.status).toBe('synced')
		expect(isRawSchema(migrated.record)).toBe(true)

		if (isRawSchema(migrated.record)) {
			expect(migrated.record.schema_version).toBe(sourceVersion)
		}
	})

	test('migration down: 1 to 0.1', () => {
		const targetVersion = 0.1
		const sourceSchema = DOC_STORE.en?.long
		const sourceVersion = sourceSchema?.schema_version

		const migrated = migrate(sourceSchema, targetVersion)

		expect(migrated.status).toBe('unsupported')
		expect(isRawSchema(migrated.record)).toBe(true)

		if (isRawSchema(migrated.record)) {
			expect(migrated.record.schema_version).toBe(sourceVersion)
		}
	})

	test(`migration up: 1 to ${SCHEMA_VERSION + 1}`, () => {
		const targetVersion = SCHEMA_VERSION + 1
		const sourceSchema = DOC_STORE.en?.long
		const sourceVersion = sourceSchema?.schema_version

		const migrated = migrate(sourceSchema, targetVersion)

		expect(migrated.status).toBe('not-found')
		expect(isRawSchema(migrated.record)).toBe(true)

		if (isRawSchema(migrated.record)) {
			expect(migrated.record.schema_version).toBe(sourceVersion)
		}
	})

	test(`migration up: undefined to ${SCHEMA_VERSION}`, () => {
		const targetVersion = SCHEMA_VERSION
		const sourceSchema = DOC_STORE
		const migrated = migrate(sourceSchema, targetVersion)

		expect(migrated.status).toBe('unversioned')
		expect(isRawSchema(migrated.record)).toBe(false)
	})
})
