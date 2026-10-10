import type {
	DocLanguage,
	Slug,
	Doc,
	Preset,
	DocStore,
	PresetStore,
	OPFSTreeDoc,
	OPFSTreePreset,
	OPFSTreeBase,
	OPFSTreeStructure,
	FrontmatterBase,
	FrontmatterStructure,
	OPFStructure,
} from '#types'

import {SCHEMA_VERSION} from '#config/setup.js'
import {migrate} from '#lib/common/migrate-schemas/engine.js'
import {
	isRecord,
	isRawDoc,
	rawDocToDoc,
	isRawPreset,
	rawPresetToPreset,
	isRawBase,
	rawBaseToBase,
	isRawStructureTree,
	rawStructureTreeToStructure,
	isRawStructure,
	rawStructureToStructure,
} from '#lib/common/transform/raw-to-typed.js'
import {
	parseBase,
	parsePreset,
	parseStructure,
} from '#lib/common/transform/parse-or-throw.js'

export function opfsDocTreeToDocStore(tree: OPFSTreeDoc): DocStore {
	const store: Partial<DocStore> = {}

	for (const [language, formats] of Object.entries(tree)) {
		if (!isRecord(formats)) continue

		let languageTree: Partial<{[format: Slug]: Doc} | undefined> =
			store[language as DocLanguage]

		if (languageTree === undefined) {
			languageTree = {}
		}

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

	try {
		if (isRawBase(tree)) {
			data = rawBaseToBase(tree)
			const migrated = migrate(data, SCHEMA_VERSION)
			const base = parseBase('OPFS Base', migrated.record)

			return base
		}
	} catch (error) {
		throw Error('Error loading FrontmatterBase', {cause: error})
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

	try {
		if (isRawStructureTree(tree)) {
			data = rawStructureTreeToStructure(tree)
		} else if (isRawStructure(tree)) {
			const structure = rawStructureToStructure(tree)

			data.push(structure)
		}

		for (const structure of data) {
			const migrated = migrate(structure, SCHEMA_VERSION)
			result.push(parseStructure(`OPFS Structure`, migrated.record))
		}
		return result
	} catch (error) {
		throw Error('Error loading FrontmatterStructure', {cause: error})
	}
}
