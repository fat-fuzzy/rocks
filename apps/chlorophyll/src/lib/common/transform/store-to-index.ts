import {
	getSectionKey,
	getSubsectionKey,
	getBlockKey,
	getPresetKey,
	getTagKey,
} from '$lib/utils/format'

import type {
	Block,
	DocumentIndex,
	DocumentStore,
	Preset,
	PresetIndex,
	PresetStore,
	Section,
	TagIndex,
	TagGroup,
} from '$types'

export function buildDocumentIndex(store: DocumentStore): DocumentIndex {
	const sections: Record<string, Section> = {}
	const sectionsById: Record<string, Section> = {}
	const subsections: Record<
		string,
		{
			name: string
			parent: string
			rank: number
			blocks: Block[]
		}
	> = {}
	const blocks: Record<string, Block> = {}

	for (const [language, formats] of Object.entries(store)) {
		for (const [format, doc] of Object.entries(formats)) {
			for (const section of doc.sections ?? []) {
				const sectionKey = getSectionKey(language, format, section.name)

				sections[sectionKey] = section
				sectionsById[section.id] = section

				if (section.subsections) {
					section.subsections.forEach((sub) => {
						const subsectionName =
							section.name !== sub.name ? sub.name : undefined
						if (subsectionName) {
							const subsectionKey = getSubsectionKey(
								language,
								format,
								section.name,
								subsectionName,
							)

							subsections[subsectionKey] = sub
						}

						for (const block of sub.blocks) {
							const blockKey = getBlockKey(
								language,
								format,
								section.name,
								block.name,
								subsectionName,
							)

							blocks[blockKey] = block
						}
					})
				}
			}
		}
	}

	return {sections, sectionsById, subsections, blocks}
}

export function buildPresetIndex(store: PresetStore): PresetIndex {
	const presets: Record<string, Preset> = {}

	for (const preset of Object.values(store)) {
		presets[getPresetKey(preset.name)] = preset
	}

	return {presets}
}

export function buildTagIndex(groups: TagGroup[], blocks: Block[]): TagIndex {
	const data: TagIndex = {
		tags: {},
		taggedBlocks: {},
	}

	data.tags = groups.reduce(
		(indexed: {[groups: string]: string[]}, group: TagGroup) => {
			if (!indexed[group.name]) {
				indexed[group.name] = group.items
			}
			return indexed
		},
		{},
	)

	data.taggedBlocks = blocks.reduce(
		(indexed: {[tagKey: string]: Block[]}, block: Block) => {
			for (const tag of block.tags) {
				const group = groups.find((g) => g.items.includes(tag))

				if (!group) {
					throw Error(`No tag group found for ${tag}`)
				}

				const tagKey = getTagKey(group.name, tag)

				if (!indexed[tagKey]) {
					indexed[tagKey] = [block]
				} else {
					indexed[tagKey].push(block)
				}
			}
			return indexed
		},
		{},
	)

	return data
}
