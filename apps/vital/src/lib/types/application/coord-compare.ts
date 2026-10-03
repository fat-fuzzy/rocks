import type {
	Slug,
	NamespaceId,
	Coordinators,
	ICoordinateDocs,
	ICoordinatePresets,
} from '#types'

export interface ICoordinateCompare {
	readonly coords: {
		[key in NamespaceId]: Coordinators
	}
	readonly loading: boolean
	readonly error: boolean

	reset(): void

	getCoordDocs(namespace: NamespaceId): ICoordinateDocs

	getCoordPresets(namespace: NamespaceId): ICoordinatePresets

	getCompareQuery(options: {
		params: URLSearchParams
		role: 'source' | 'target'
		namespace: NamespaceId
		presetName?: Slug
	}): string
}
