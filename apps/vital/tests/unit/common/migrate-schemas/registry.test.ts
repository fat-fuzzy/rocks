import {describe, expect, test} from 'vitest'

import {MIGRATIONS} from '#lib/common/migrate-schemas/registry.js'

describe('migrate-schemas/registry.ts', () => {
	test('declares known migration edges', () => {
		expect(MIGRATIONS).toHaveLength(2)
		expect(MIGRATIONS.map((m) => [m.from, m.to])).toEqual([
			[0, 1],
			[0.1, 1],
		])
	})

	test('each migration step normalizes schema_version to 1', () => {
		for (const migration of MIGRATIONS) {
			const result = migration.up({schema_version: migration.from, value: 'x'})
			expect(result).toMatchObject({schema_version: 1, value: 'x'})
		}
	})
})
