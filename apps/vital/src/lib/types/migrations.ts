export type MigrationStatus =
	'synced' | 'unsupported' | 'not-found' | 'migrated' | 'unversioned'

export type Migration = {
	from: number // schema_version it accepts
	to: number // from + 1
	up: (record: unknown) => unknown
}

export type MigrationResult =
	| {status: 'synced'; record: unknown}
	| {status: 'unsupported'; record: unknown; from: number; to: number}
	| {status: 'not-found'; record: unknown; from: number; to: number}
	| {status: 'migrated'; record: unknown; from: number; to: number}
	| {status: 'unversioned'; record: unknown}
