export type DbStatus =
	'synced' | 'unsupported' | 'not-found' | 'migrated' | 'unversioned'

export type DbStep = 'init-db' | 'reset-db' | 'ping-back'

export type DbResult =
	| {status: 'synced'; record: unknown}
	| {status: 'unsupported'; record: unknown; from: number; to: number}
	| {status: 'sync-db'; record: unknown; from: number; to: number}
	| {status: 'not-found'; record: unknown; from: number; to: number}
	| {status: 'migrated'; record: unknown; from: number; to: number}
	| {status: 'unversioned'; record: unknown}
