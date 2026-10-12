import type {Migration, MigrationResult} from '#types'

import {
	parseSchemaVersion,
	isRawSchema,
} from '#lib/common/transform/raw-to-typed.js'
import {MIGRATIONS} from '#lib/common/migrate-schemas/registry.js'

export const migrate = (
	data: unknown,
	toVersion: number,
	registry: Migration[] = MIGRATIONS,
): MigrationResult => {
	let record = data

	if (!isRawSchema(record)) {
		return {status: 'unversioned', record}
	}

	if (
		parseSchemaVersion(record.schema_version) === null ||
		parseSchemaVersion(toVersion) === null
	) {
		return {status: 'unversioned', record}
	}

	const fromVersion = Number(record.schema_version)
	const toVersionNormalized = Number(toVersion)

	if (fromVersion === toVersionNormalized) {
		record.schema_version = Number(record.schema_version)

		return {status: 'synced', record}
	}

	if (
		(fromVersion < 1 && fromVersion !== 0.1) ||
		(toVersionNormalized < 1 && toVersionNormalized !== 0.1)
	) {
		return {
			status: 'unsupported',
			record: data,
			from: fromVersion,
			to: toVersionNormalized,
		}
	}

	if (fromVersion > toVersionNormalized) {
		return {
			status: 'sync-app',
			record: data,
			from: fromVersion,
			to: toVersionNormalized,
		}
	}

	let version = fromVersion
	while (version !== toVersionNormalized) {
		const step = registry.find((migration) => migration.from === version)

		if (!step || step.to <= version || step.to > toVersionNormalized) {
			return {
				status: 'not-found',
				record: data,
				from: fromVersion,
				to: toVersionNormalized,
			}
		}

		record = step.up(record)
		version = step.to
	}

	return {
		status: 'migrated',
		record,
		from: fromVersion,
		to: toVersionNormalized,
	}
}
