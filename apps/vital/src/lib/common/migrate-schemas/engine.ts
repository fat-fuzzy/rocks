import type {MigrationResult, MigrationStatus} from '#types'

import {isRecord} from '#lib/common/transform/opfs-to-doc.js'
import {MIGRATIONS} from '#lib/common/migrate-schemas/registry.js'

type RawSchema = {
	schema_version: number
} & Record<string, unknown>

export function isRawSchema(value: unknown): value is RawSchema {
	if (!isRecord(value)) {
		return false
	}

	return 'schema_version' in value
}

export const migrate = (
	data: unknown,
	fromVersion: number,
	toVersion: number,
): MigrationResult => {
	let record = data
	let status: MigrationStatus = 'unversioned'

	if (isRawSchema(record)) {
		if (record.schema_version === toVersion) {
			status = 'current'
		} else {
			const migration = MIGRATIONS.find(
				({from, to}) =>
					from === Number(fromVersion) && to === Number(toVersion),
			)

			if (!migration) {
				throw Error(
					`Migration failed: missing migration function: from ${fromVersion} to ${toVersion}`,
				)
			}

			const migrationFn =
				fromVersion > toVersion ? migration?.down : migration?.up

			for (let v = fromVersion; v < toVersion; v++) {
				record = migrationFn(record)
			}

			status = 'migrated'
		}

		return {status, record, from: fromVersion, to: toVersion}
	}

	return {status, record}
}
