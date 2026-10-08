export type MigrationStatus = 'current' | 'migrated' | 'unversioned'

export type Migration = {
	from: number // schema_version it accepts
	to: number // from + 1
	up: (record: unknown) => unknown
	down: (record: unknown) => unknown
}

export type MigrationResult =
	| {status: 'current'; record: unknown}
	| {status: 'migrated'; record: unknown; from: number; to: number}
	| {status: 'unversioned'; record: unknown}
