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
	Uuid,
	DocPath,
	OPFStructure,
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

type RawDoc = {
	content: {schema_version: string; id: Uuid; path: DocPath}
	meta: {language: DocLanguage; format: Slug; name: Slug}
} & Record<string, unknown>

export function isRawDoc(value: unknown): value is RawDoc {
	if (!isRecord(value)) {
		return false
	}

	return 'meta' in value && 'content' in value
}

export function rawDocToDoc(raw: RawDoc): Section[] {
	const rawEntries = Object.entries(raw)
	const sections: Section[] = []

	for (const entry of rawEntries) {
		const [key, rawSection] = entry
		let section: Section | undefined

		if (key === 'content' || key === 'meta') {
			continue
		}
		if (isRawSection(rawSection)) {
			section = parseSection(
				`OPFS Section: ${rawSection.meta.name}`,
				rawSectionToSection(rawSection),
			)
		} else if (isSection(rawSection)) {
			section = parseSection(
				`OPFS Section: ${rawSection.name}`,
				rawToSection(rawSection),
			)
		}

		if (section) {
			sections.push(section)
		}
	}

	return sections
}

type RawSection = {
	content: Section
	meta: DocMeta
}

export function isRawSection(value: unknown): value is RawSection {
	if (!isRecord(value)) {
		return false
	}

	return 'meta' in value && 'content' in value
}

export function rawSectionToSection(raw: RawSection): Section {
	return raw.content
}

type RawPreset = {content: Preset; meta: DocMeta}

export function isRawPreset(value: unknown): value is RawPreset {
	if (!isRecord(value)) {
		return false
	}

	return (
		'meta' in value &&
		'content' in value &&
		'query' in (value.content as {content: unknown})
	)
}

function rawPresetToPreset(raw: RawPreset): Preset {
	return raw.content
}

type RawBase = {content: FrontmatterBase; meta: DocMeta}

export function isRawBase(value: unknown): value is RawBase {
	if (!isRecord(value)) {
		return false
	}

	return (
		'meta' in value &&
		'content' in value &&
		'languages' in (value.content as {content: unknown}) &&
		'formats' in (value.content as {content: unknown})
	)
}

function rawBaseToBase(raw: RawBase): FrontmatterBase {
	return raw.content
}

type RawStructureTree = {
	content: {structure: FrontmatterStructure[]}
	meta: DocMeta
}

export function isRawStructureTree(value: unknown): value is RawStructureTree {
	if (!isRecord(value)) {
		return false
	}

	return (
		'meta' in value &&
		'content' in value &&
		'structure' in (value.content as {content: unknown})
	)
}

function rawStructureTreeToStructure(
	raw: RawStructureTree,
): FrontmatterStructure[] {
	return raw.content.structure
}

type RawStructure = {
	content: FrontmatterStructure
	meta: DocMeta
}

export function isRawStructure(value: unknown): value is RawStructure {
	if (!isRecord(value)) {
		return false
	}

	return (
		'meta' in value &&
		'content' in value &&
		'format' in (value.content as {content: unknown})
	)
}

function rawStructureToStructure(raw: RawStructure): FrontmatterStructure {
	return raw.content
}

export function isSection(value: unknown): value is Section {
	if (!isRecord(value)) {
		return false
	}

	return 'content_type' in value && value.content_type === 'section'
}

function rawToSection(raw: Section): Section {
	return raw
}

// FIXME: fix many issues
export function opfsDocTreeToDocStore(tree: OPFSTreeDoc): DocStore {
	const store: Partial<DocStore> = {}

	for (const [language, formats] of Object.entries(tree)) {
		if (!isRecord(formats)) continue

		let languageTree: Partial<{[format: Slug]: Doc} | undefined> =
			store[language as DocLanguage]

		if (languageTree === undefined) {
			languageTree = {}
		}

		languageTree = JSON.parse(JSON.stringify(languageTree))

		if (languageTree === undefined) {
			console.warn(`No folder found for ${language}`)

			continue
		}

		for (const [format, docTree] of Object.entries(formats)) {
			const doc: Doc = {
				id: crypto.randomUUID(),
				schema_version: SCHEMA_VERSION,
				meta: {
					content_type: 'section',
					id: crypto.randomUUID(),
					name: 'doc-root',
					label: 'doc-root',
				},
				path: {
					filename: 'doc-root',
					filetype: 'json',
				},
				sections: [],
			}

			if (isRawDoc(docTree)) {
				doc.sections = rawDocToDoc(docTree)
			}

			languageTree[format as Slug] = doc
		}

		store[language as DocLanguage] = languageTree
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
	tree: OPFSTreeStructure | OPFStructure,
): FrontmatterStructure[] {
	let data = []
	const result = []

	if (isRawStructureTree(tree)) {
		data = rawStructureTreeToStructure(tree)
	} else if (isRawStructure(tree)) {
		const structure = rawStructureToStructure(tree)

		data.push(structure)
	}

	for (const structure of data) {
		result.push(
			parseStructure(`OPFS Structure: ${structure.format}`, structure),
		)
	}
	return result
}
