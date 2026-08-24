import type {Uuid, DocMeta, DocPath, Preset, IAggregatePresets} from '$types'

export interface ICoordinatePresets {
	readonly aggPresets: IAggregatePresets
	readonly loading: boolean
	readonly error: boolean

	reset(): void

	hasPresets(): boolean
	getPreset(name: string): Preset

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
