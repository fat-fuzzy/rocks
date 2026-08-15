import type {Uuid, DocMeta, DocPath, Preset} from '$types'

export type PresetStore = {
	[name: string]: Preset
}

export interface PresetIndex {
	presets: Record<string, Preset> // keyed by name
}

export interface IPresetService {
	readonly seeded: {date_seed?: string; source?: string}
	readonly loading: boolean
	readonly error: boolean
	readonly presets: PresetStore
	readonly presetIndex: PresetIndex

	init(): Promise<void>
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
