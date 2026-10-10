import type {Migration} from '#types'

// ordered, each `to` is the next `from`
export const MIGRATIONS: Migration[] = [
	{from: 0, to: 1, up: (d) => ({...(d as object), schema_version: 1})},
]
