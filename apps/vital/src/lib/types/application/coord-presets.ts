import type {
	Uuid,
	DocMeta,
	DocPath,
	Preset,
	IAggregatePresets,
	IAggregateMetadata,
	NamespaceId,
} from '$types'

export interface ICoordinatePresets {
	readonly aggMetadata: IAggregateMetadata
	readonly aggPresets: IAggregatePresets
	readonly loading: boolean
	readonly error: boolean
	readonly sourcePreset: Preset | null
	readonly targetPreset: Preset | null
	readonly sourceRoot: NamespaceId | undefined
	readonly targetRoot: NamespaceId | undefined

	reset(): void

	getRoot(): NamespaceId

	getSourceRoot(): NamespaceId | undefined

	getTargetRoot(): NamespaceId | undefined

	setSourceRoot(root: NamespaceId): void

	setTargetRoot(root: NamespaceId): void

	hasPresets(): boolean

	getPreset(name: string): Preset | void

	getPresetTags(name: string): string[]

	getTargetPreset(): Preset | null

	getSourcePreset(): Preset | null

	setSourcePreset(name?: string | null): void

	setTargetPreset(name?: string | null): void

	getPresetQuery(name: string): string

	getSourcePresetQuery(name: string): string

	getTargetPresetQuery(name: string): string

	getCompareQuery(options: {
		query: string
		source: {root?: NamespaceId; preset?: string}
		target: {root?: NamespaceId; preset?: string}
	}): string

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
