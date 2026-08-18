import type {
	DocLanguage,
	Slug,
	DocMeta,
	Doc,
	Section,
	Preset,
	DocStore,
	PresetStore,
	OPFSTreeDoc,
	OPFSTreePreset,
	OPFSTreeBase,
	OPFSTreeStructure,
	FrontmatterBase,
	FrontmatterStructure,
} from '$types'

import {SCHEMA_VERSION} from '$config/setup'
import {
	parseSection,
	parseBase,
	parsePreset,
	parseStructure,
} from '$lib/common/transform/parse-or-throw'

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

type RawSection = {content: Section; meta: DocMeta}

export function isRawSection(value: unknown): value is RawSection {
	if (!isRecord(value)) {
		return false
	}

	return 'meta' in value && 'content' in value
}

type RawPreset = {content: Preset; meta: DocMeta}

export function isRawPreset(value: unknown): value is RawPreset {
	if (!isRecord(value)) {
		return false
	}

	return 'meta' in value && 'content' in value
}

export function rawSectionToSection(raw: RawSection): Section {
	return raw.content
}

function rawPresetToPreset(raw: RawPreset): Preset {
	return raw.content
}

type RawBase = {content: FrontmatterBase; meta: DocMeta}

export function isRawBase(value: unknown): value is RawBase {
	if (!isRecord(value)) {
		return false
	}

	return 'meta' in value && 'content' in value
}

function rawBaseToBase(raw: RawBase): FrontmatterBase {
	return raw.content
}

type RawStructure = {
	content: {structure: FrontmatterStructure[]}
	meta: DocMeta
}

export function isRawStructure(value: unknown): value is RawStructure {
	if (!isRecord(value)) {
		return false
	}

	return (
		'meta' in value &&
		'content' in value &&
		'structure' in (value.content as {content: unknown})
	)
}

function rawStructureToStructure(raw: RawStructure): FrontmatterStructure[] {
	return raw.content.structure
}

export function isSection(value: unknown): value is Section {
	if (!isRecord(value)) {
		return false
	}

	return 'meta' in value && 'content' in value
}

function rawToSection(raw: Section): Section {
	return raw
}

export function opfsDocTreeToDocStore(tree: OPFSTreeDoc): DocStore {
	// eslint-disable-next-line
	const store: any = {} // FIXME: fix type

	for (const [language, formats] of Object.entries(tree)) {
		if (!isRecord(formats)) continue

		store[language as DocLanguage] = {}

		for (const [format, sections] of Object.entries(formats)) {
			if (!isRecord(sections)) continue

			if (!store[language as DocLanguage]) continue

			store[language as DocLanguage][format as Slug] = {}

			// FIXME: this should come from storage
			// - meta.json at root > content folder level
			const doc: Doc = {
				id: crypto.randomUUID(),
				schema_version: SCHEMA_VERSION,
				meta: {
					id: crypto.randomUUID(),
					content_type: 'doc-root',
					label: 'doc-root',
					name: 'doc-root',
					language: language as DocLanguage,
					format: format as Slug,
				},
				path: {
					filename: 'doc-root',
					filetype: 'json',
				},
				sections: [],
			}

			let section: Section
			for (const [sectionName, rawSection] of Object.entries(sections)) {
				if (sectionName === 'meta') {
					continue
				}

				if (isRawSection(rawSection)) {
					section = rawSectionToSection(rawSection)

					doc.sections?.push(
						parseSection(`OPFS Section: ${sectionName}`, section),
					)
				} else if (isSection(rawSection)) {
					section = rawToSection(rawSection)

					doc.sections?.push(
						parseSection(`OPFS Section: ${sectionName}`, section),
					)
				}
			}

			store[language as DocLanguage][format as Slug] = doc
		}
	}

	return store as DocStore
}

export function opfsPresetTreeToPresetStore(tree: OPFSTreePreset): PresetStore {
	// eslint-disable-next-line
	const store: any = {} // FIXME: fix type

	let data: Preset
	for (const [presetName, rawPreset] of Object.entries(tree)) {
		if (isRawPreset(rawPreset)) {
			data = rawPresetToPreset(rawPreset)

			const preset = parsePreset(`OPFS Preset: ${presetName}`, data)

			store[presetName] = preset
		}
	}

	return store as PresetStore
}

export function opfsBaseTreeToFrontmatterBase(
	tree: OPFSTreeBase,
): FrontmatterBase {
	let data: FrontmatterBase

	if (isRawBase(tree)) {
		data = rawBaseToBase(tree)
		const base = parseBase('OPFS Doc base', data)

		return base
	}

	// Return default fallback
	// TODO: review this
	return {
		schema_version: SCHEMA_VERSION,
		languages: [],
		formats: [],
		tags: [],
		settings: [],
	}
}

export function opfsStructureTreeToFrontmatterStructures(
	tree: OPFSTreeStructure,
): FrontmatterStructure[] {
	let data: FrontmatterStructure[]
	const result = []

	if (isRawStructure(tree)) {
		data = rawStructureToStructure(tree)

		for (const structure of data) {
			result.push(
				parseStructure(`OPFS Structure: ${structure.format}`, structure),
			)
		}

		return result
	}

	// Return default fallback
	// TODO: review this
	return []
}
