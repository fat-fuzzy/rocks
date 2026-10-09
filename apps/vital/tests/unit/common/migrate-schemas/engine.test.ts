import {describe, test, expect} from 'vitest'

import {isRawSchema} from '#lib/common/transform/raw-to-typed.js'
import {migrate} from '#lib/common/migrate-schemas/engine.js'

import {SEED_DOC} from '#tests/fixtures/seed.js'
import {DOC_STORE} from '#tests/fixtures/doc.js'

describe('migrate-schemas/engine.ts - JSON Schema migration engine', () => {
	test('migration up: 0.1 to 1', () => {
		const sourceVersion = SEED_DOC.schema_version ?? '0.1'
		const targetVersion = DOC_STORE.schema_version ?? 1
		const migrated = migrate(
			SEED_DOC,
			Number(sourceVersion),
			Number(targetVersion),
		)

		if (isRawSchema(migrated.record)) {
			expect(migrated.record.schema_version).toBe(targetVersion)
		}
	})

	test('migration down: 1 to 0.1', () => {
		const sourceVersion = DOC_STORE.schema_version ?? 1
		const targetVersion = SEED_DOC.schema_version ?? '0.1'
		const migrated = migrate(
			DOC_STORE,
			Number(sourceVersion),
			Number(targetVersion),
		)

		if (isRawSchema(migrated.record)) {
			expect(migrated.record.schema_version).toBe(targetVersion)
		}
	})
})
