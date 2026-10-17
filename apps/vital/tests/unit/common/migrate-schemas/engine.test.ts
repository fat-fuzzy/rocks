import {describe, test, expect} from 'vitest'

import {isRawSchema} from '#lib/common/transform/raw-to-typed.js'
import {migrate} from '#lib/common/migrate-schemas/engine.js'

import {SEED_DOC} from '#tests/fixtures/seed.js'
import {DOC_STORE} from '#tests/fixtures/doc.js'
import {SCHEMA_VERSION} from '#config/setup.js'

describe('migrate-schemas/engine.ts - JSON Schema migration engine', () => {
	describe('migration up', () => {
		test(`undefined to ${SCHEMA_VERSION}`, () => {
			const targetVersion = SCHEMA_VERSION
			const sourceSchema = DOC_STORE
			const migrated = migrate(sourceSchema, targetVersion)

			expect(migrated.status).toBe('unversioned')
			expect(isRawSchema(migrated.record)).toBe(false)
		})

		test(`0.1 to ${SCHEMA_VERSION}`, () => {
			const targetVersion = SCHEMA_VERSION
			const migrated = migrate(SEED_DOC, targetVersion)

			expect(migrated.status).toBe('migrated')
			expect(isRawSchema(migrated.record)).toBe(true)

			if (isRawSchema(migrated.record)) {
				expect(migrated.record.schema_version).toBe(targetVersion)
			}
		})

		test(`1 to ${SCHEMA_VERSION + 1}`, () => {
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

		test('0.1 to 0.1', () => {
			const targetVersion = 0.1
			const sourceSchema = SEED_DOC

			const migrated = migrate(sourceSchema, targetVersion)

			expect(migrated.status).toBe('synced')
			expect(isRawSchema(migrated.record)).toBe(true)

			if (isRawSchema(migrated.record)) {
				expect(migrated.record.schema_version).toBe(targetVersion)
			}
		})

		test('1 to 1', () => {
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
	})

	describe('migration down', () => {
		test('1 to 0.11', () => {
			const targetVersion = 0.11
			const sourceSchema = DOC_STORE.en?.long
			const sourceVersion = sourceSchema?.schema_version

			const migrated = migrate(sourceSchema, targetVersion)

			expect(migrated.status).toBe('unsupported')
			expect(isRawSchema(migrated.record)).toBe(true)

			if (isRawSchema(migrated.record)) {
				expect(migrated.record.schema_version).toBe(sourceVersion)
			}
		})

		test('1 to 0.1', () => {
			const targetVersion = 0.1
			const sourceSchema = DOC_STORE.en?.long
			const sourceVersion = sourceSchema?.schema_version

			const migrated = migrate(sourceSchema, targetVersion)

			expect(migrated.status).toBe('sync-app')
			expect(isRawSchema(migrated.record)).toBe(true)

			if (isRawSchema(migrated.record)) {
				expect(migrated.record.schema_version).toBe(sourceVersion)
			}
		})
	})

	describe('custom registry', () => {
		test('rejects a non-progressing migration step', () => {
			const source = {...SEED_DOC, schema_version: 0.1}
			const migrated = migrate(source, 1, [{from: 0.1, to: 0.1, up: (d) => d}])

			expect(migrated.status).toBe('not-found')

			if (migrated.status === 'not-found') {
				// should be true by now
				expect(migrated.from).toBe(0.1)
				expect(migrated.to).toBe(1)
			}
		})

		test('rejects a step that overshoots target version', () => {
			const source = {...SEED_DOC, schema_version: 0.1}
			const migrated = migrate(source, 1, [
				{from: 0.1, to: 2, up: (d) => ({...(d as object), schema_version: 2})},
			])

			if (migrated.status === 'not-found') {
				// should be true by now
				expect(migrated.from).toBe(0.1)
				expect(migrated.to).toBe(1)
			}
		})
	})

	describe('migration edge cases', () => {
		test.each([
			['0.1', 'migrated'], // legacy string is accepted and migrated
			[1, 'synced'],
			[0, 'unsupported'],
			[-1, 'unsupported'],
			[Infinity, 'unversioned'],
			['fuzzy', 'unversioned'],
			[true, 'unversioned'],
			[[1], 'unversioned'],
			[null, 'unversioned'],
		])('Source schema_version: %j, Status: %s', (version, status) => {
			const doc = {...SEED_DOC, schema_version: version}
			expect(migrate(doc, SCHEMA_VERSION).status).toBe(status)
		})
	})
})
