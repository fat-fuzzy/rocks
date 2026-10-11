import type {MigrationResult} from '#types'

import {isScalar, isRawSchema} from '#lib/common/transform/raw-to-typed.js'
import {MIGRATIONS} from '#lib/common/migrate-schemas/registry.js'

export const migrate = (data: unknown, toVersion: number): MigrationResult => {
	let record = data

	if (!isRawSchema(record)) {
		return {status: 'unversioned', record}
	}

	const fromVersion = Number(record.schema_version)
	const toVersionNormalized = Number(toVersion)

	if (!isScalar(fromVersion) || !isScalar(toVersionNormalized)) {
		return {status: 'unversioned', record}
	}

	if (fromVersion === toVersionNormalized) {
		record.schema_version = Number(record.schema_version)

		return {status: 'synced', record}
	}

	if (
		fromVersion < 0.1 ||
		(fromVersion > 0.1 && fromVersion < 1) ||
		toVersionNormalized < 0.1 ||
		(toVersionNormalized > 0.1 && toVersionNormalized < 1)
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
			status: 'outdated',
			record: data,
			from: fromVersion,
			to: toVersionNormalized,
		}
	}

	for (let v = fromVersion; v < toVersionNormalized; v++) {
		const migration = MIGRATIONS.find(
			({from, to}) => from === v && to === Math.floor(v) + 1,
		)

		if (!migration) {
			return {
				status: 'not-found',
				record: data,
				from: fromVersion,
				to: toVersionNormalized,
			}
		}

		record = migration.up(record)
	}

	return {
		status: 'migrated',
		record,
		from: fromVersion,
		to: toVersionNormalized,
	}
}
