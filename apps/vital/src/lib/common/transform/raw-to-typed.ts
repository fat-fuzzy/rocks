import type {
	Section,
	Preset,
	FrontmatterBase,
	FrontmatterStructure,
	RawSchema,
	RawDoc,
	RawSection,
	RawPreset,
	RawBase,
	RawStructureTree,
	RawStructure,
} from '#types'

import {parseSection} from '#lib/common/transform/parse-or-throw.js'

export function isScalar(n: unknown): n is number {
	return typeof n === 'number' && !Number.isNaN(n)
}

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

export function isRawSchema(value: unknown): value is RawSchema {
	if (!isRecord(value)) {
		return false
	}

	return 'schema_version' in value
}

export function isSection(value: unknown): value is Section {
	if (!isRecord(value)) {
		return false
	}

	return 'content_type' in value && value.content_type === 'section'
}

export function rawToSection(raw: Section): Section {
	return raw
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

export function rawPresetToPreset(raw: RawPreset): Preset {
	return raw.content
}

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

export function rawBaseToBase(raw: RawBase): FrontmatterBase {
	return raw.content
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

export function rawStructureTreeToStructure(
	raw: RawStructureTree,
): FrontmatterStructure[] {
	return raw.content.structure
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

export function rawStructureToStructure(
	raw: RawStructure,
): FrontmatterStructure {
	return raw.content
}
