import {describe, expect, test} from 'vitest'

import {handleDataTransformError} from '#lib/common/errors/migration.js'

describe('errors/migration.ts', () => {
	test('builds the default shape for unknown status', () => {
		const result = handleDataTransformError('init-seed', 'load:other', {
			schema_version: 2,
		})

		expect(result).toEqual({
			status: 'other',
			message: 'There was an error loading your document',
			details: 'init-seed:load:other',
			actions: {},
		})
	})

	test('returns data-sync guidance for unversioned status', () => {
		const result = handleDataTransformError(
			'init-seed',
			'migration:unversioned',
			{
				schema_version: 0,
			},
		)

		expect(result.status).toBe('unversioned')
		expect(result.message).toContain('Data schema version 0 is not supported.')
		expect(result.message).toContain('Supported version: 1.')
		expect(result.actions).toEqual({sync: 'data'})
	})

	test('returns code-sync guidance for not-found status', () => {
		const result = handleDataTransformError(
			'init-seed',
			'migration:not-found',
			{
				content: {},
			},
		)

		expect(result.status).toBe('not-found')
		expect(result.message).toContain(
			'No migration path found from version [unversioned] to version: 1.',
		)
		expect(result.actions).toEqual({sync: 'code'})
	})

	test('returns app-sync guidance for sync-app status', () => {
		const result = handleDataTransformError('init-seed', 'migration:sync-app', {
			schema_version: 3,
		})

		expect(result.status).toBe('sync-app')
		expect(result.message).toContain('Current app schema version: 1.')
		expect(result.actions).toEqual({sync: 'app'})
	})

	test('returns code-sync guidance for unsupported status', () => {
		const result = handleDataTransformError(
			'init-seed',
			'migration:unsupported',
			{
				schema_version: 3,
			},
		)

		expect(result.status).toBe('unsupported')
		expect(result.message).toContain(
			'Update SCHEMA_VERSION settings or regenerate schemas to fix this error.',
		)
		expect(result.actions).toEqual({sync: 'code'})
	})
})
