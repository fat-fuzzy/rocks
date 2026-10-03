import type {
	Uuid,
	DocMeta,
	DocPath,
	Preset,
	IAggregatePresets,
	IAggregateMetadata,
	NamespaceId,
} from '#types'

export interface ICoordinatePresets {
	readonly aggMetadata: IAggregateMetadata
	readonly aggPresets: IAggregatePresets
	readonly loading: boolean
	readonly error: boolean

	reset(): void

	getRoot(): NamespaceId

	hasPresets(): boolean

	getPreset(name: string): Preset | void

	getPresetTags(name: string): string[]

	getPresetQuery(name: string): string

	getSourcePresetQuery(name: string): string

	getTargetPresetQuery(name: string): string

	savePreset(options: {
		path: DocPath
		meta: DocMeta
		preset: {id?: Uuid; name: string; query: string}
	}): Promise<void>

	deletePreset(options: {path: DocPath; meta: DocMeta}): Promise<void>

	getAllPresets(): Promise<void>

	loadPresets(): Record<string, Preset>

	togglePresetLock(options: {
		path: DocPath
		meta: DocMeta
		preset: {id?: Uuid; name: string; query: string}
	}): Promise<void>
}
