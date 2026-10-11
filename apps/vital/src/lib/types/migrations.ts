export type MigrationStatus =
	'synced' | 'unsupported' | 'not-found' | 'migrated' | 'unversioned'

export type MigrationTarget = 'app' | 'data'

export type MigrationStep =
	| 'init-seed'
	| 'init-metadata'
	| 'load-metadata'
	| 'load-doc-store'
	| 'load-base'
	| 'load-structure'
	| 'load-presets'

export type Migration = {
	from: number // schema_version it accepts
	to: number // from + 1
	up: (record: unknown) => unknown
}

export type MigrationResult =
	| {status: 'synced'; record: unknown}
	| {status: 'unsupported'; record: unknown; from: number; to: number}
	| {status: 'outdated'; record: unknown; from: number; to: number}
	| {status: 'not-found'; record: unknown; from: number; to: number}
	| {status: 'migrated'; record: unknown; from: number; to: number}
	| {status: 'unversioned'; record: unknown}
