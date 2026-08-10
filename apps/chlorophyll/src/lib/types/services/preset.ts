import type {Preset} from '$types'

export type PresetStore = {
	[name: string]: Preset
}

export interface PresetIndex {
	presets: Record<string, Preset> // keyed by name
}
