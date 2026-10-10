import type {MigrationResult} from '#types'

import {isScalar, isRawSchema} from '#lib/common/transform/raw-to-typed.js'
import {MIGRATIONS} from '#lib/common/migrate-schemas/registry.js'

export const migrate = (data: unknown, toVersion: number): MigrationResult => {
	let record = data

	if (!isRawSchema(record)) {
		return {status: 'unversioned', record}
	}

	const fromVersion = Math.floor(Number(record.schema_version))

	if (!isScalar(fromVersion) || !isScalar(toVersion)) {
		return {status: 'unversioned', record}
	}

	if (fromVersion === toVersion) {
		return {status: 'synced', record}
	}

	if (fromVersion > toVersion) {
		return {
			status: 'unsupported',
			record: data,
			from: fromVersion,
			to: toVersion,
		}
	}

	for (let v = fromVersion; v < Math.floor(toVersion); v++) {
		const migration = MIGRATIONS.find(
			({from, to}) => from === v && to === v + 1,
		)

		if (!migration) {
			return {
				status: 'not-found',
				record: data,
				from: fromVersion,
				to: toVersion,
			}
		}

		record = migration.up(record)
	}

	return {status: 'migrated', record, from: fromVersion, to: toVersion}
}
