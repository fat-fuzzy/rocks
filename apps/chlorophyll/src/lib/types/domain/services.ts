import type {
	DocLanguage,
	DocFormat,
	Block,
	Preset,
	Section,
	Document,
} from '$types'

export type DocumentStore = {
	[language in DocLanguage]?: {
		[format in DocFormat]?: Document
	}
}

export type PresetStore = {
	[name: string]: Preset
}

// UI-layer index, never persisted

export interface DocumentIndex {
	sections: Record<string, Section> // keyed by sectionKey = [group.tag]
	sectionsById: Record<string, Section> // keyed by id
	subsections: Record<
		string,
		{
			name: string
			parent: string
			rank: number
			blocks: Block[]
		}
	> // keyed by name
	blocks: Record<string, Block> // keyed by id
}

export interface PresetIndex {
	presets: Record<string, Preset> // keyed by name
}

export interface TagIndex {
	tags: Record<string, string[]> // keyed by group
	taggedBlocks: Record<string, Block[]> //   keyed by tagKey = group:tag
}
