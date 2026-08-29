import type {
	Uuid,
	DocMeta,
	DocPath,
	Preset,
	IAggregatePresets,
	IAggregateMetadata,
	Slug,
} from '$types'

export interface ICoordinatePresets {
	readonly aggMetadata: IAggregateMetadata
	readonly aggPresets: IAggregatePresets
	readonly loading: boolean
	readonly error: boolean
	readonly sourcePreset: Preset | null
	readonly targetPreset: Preset | null

	reset(): void

	hasPresets(): boolean

	getPreset(name: string): Preset

	getPresetTags(name: string): string[]

	getTargetPreset(): Preset | null

	getSourcePreset(): Preset | null

	setSourcePreset(name?: string | null): void

	setTargetPreset(name?: string | null): void

	getPresetQuery(name: string): string

	getSourcePresetQuery(name: string): string

	getTargetPresetQuery(name: string): string

	getCompareQuery(name: string, isSource: boolean, isTarget: boolean): string

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

	getPresetByRole(presetRole: Slug, presetName?: string | null): Preset | null
}
