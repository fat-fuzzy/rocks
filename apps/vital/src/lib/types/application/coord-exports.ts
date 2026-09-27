import type {FileExt, NamespaceId} from '$types'

export interface ICoordinateExports {
	readonly export: {type: string; meta: Record<string, unknown>; data: string}
	readonly loading: boolean
	readonly error: boolean

	getRoot(): NamespaceId

	exportData(options: {filetype: FileExt}): Promise<string>
}
