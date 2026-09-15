import type {AjvValidateFunction} from '@fat-fuzzy/ui'
import type {
	Slug,
	Block,
	Section,
	Doc,
	Preset,
	FrontmatterBase,
	FrontmatterStructure,
	DocLanguage,
	Path,
	DateString,
	Uuid,
} from '$types'

import {
	BlockValidator,
	SectionValidator,
	DocValidator,
	PresetValidator,
	FrontmatterBaseValidator,
	SlugValidator,
	LanguageValidator,
	FrontmatterStructureValidator,
	PathValidator,
	DateStringValidator,
	UuidValidator,
} from '$lib/common/validate'

/*******************
 *  Hard fails
 *******************/
export function sanitizeFileName(_filename: string): string {
	// 1. Reject explicitly
	if (_filename.includes('..') || _filename.includes('/')) {
		throw Error('Invalid filename')
	}

	// 2. Strip anything unexpected as a second layer
	return _filename.replace(/[^a-zA-Z0-9_\-.]/g, '')
}

/*******************
 *  Soft fails
 *******************/
function sanitizeValue<T>(
	data: unknown,
	validate: AjvValidateFunction<T>,
): T | null {
	const wrapped = {value: data}

	return validate(wrapped.value) ? wrapped.value : null
}

export function sanitizeBlock(data: unknown): Block | null {
	return sanitizeValue<Block>(data, BlockValidator)
}

export function sanitizeSection(data: unknown): Section | null {
	return sanitizeValue<Section>(data, SectionValidator)
}

export function sanitizeDoc(data: unknown): Doc | null {
	return sanitizeValue<Doc>(data, DocValidator)
}

export function sanitizePreset(data: unknown): Preset | null {
	return sanitizeValue<Preset>(data, PresetValidator)
}

export function sanitizeBase(data: unknown): FrontmatterBase | null {
	return sanitizeValue<FrontmatterBase>(data, FrontmatterBaseValidator)
}

export function sanitizeStructure(data: unknown): FrontmatterStructure | null {
	return sanitizeValue<FrontmatterStructure>(
		data,
		FrontmatterStructureValidator,
	)
}

export function sanitizeSlugValue(data: unknown): Slug | null {
	return (
		sanitizeValue<{value: Slug}>({value: data}, SlugValidator)?.value || null
	)
}

export function sanitizeLanguageValue(data: unknown): DocLanguage | null {
	return (
		sanitizeValue<{value: DocLanguage}>({value: data}, LanguageValidator)
			?.value || null
	)
}

export function sanitizePathValue(data: unknown): Path | null {
	return (
		sanitizeValue<{value: Path}>({value: data}, PathValidator)?.value || null
	)
}

export function sanitizeDateStringValue(data: unknown): DateString | null {
	return (
		sanitizeValue<{value: DateString}>({value: data}, DateStringValidator)
			?.value || null
	)
}

export function sanitizeUuidValue(data: unknown): Uuid | null {
	return (
		sanitizeValue<{value: Uuid}>({value: data}, UuidValidator)?.value || null
	)
}
