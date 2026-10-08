import type {Migration} from '#types'

const MIGRATIONS_UP: Record<number, (data: unknown) => unknown> = {
	// Initial shape: migrate schema version to Integer
	1: (d) => ({...(d as object), schema_version: 1}),

	// Up Migration Examples:
	// added tags field
	// 2: (d: V1) => ({...d, tags: []}),
}

const MIGRATIONS_DOWN: Record<number, (data: unknown) => unknown> = {
	// Initial shape: migrate schema version to Integer
	1: (d) => ({...(d as object), schema_version: 0.1}),

	// Down Migration Examples:
	// added tags field
	// 2: (d: V1) => {
	// delete d.tags
	// return d
	// },
}

// ordered, each `to` is the next `from`
export const MIGRATIONS: Migration[] = [
	{from: 0.1, to: 1, up: MIGRATIONS_UP[1], down: MIGRATIONS_DOWN[1]},
]
