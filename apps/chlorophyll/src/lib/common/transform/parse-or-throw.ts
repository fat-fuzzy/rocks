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
} from '$lib/common/validate'

/*******************
 *  Hard fails
 *******************/

function parseOrThrow<T>(
	label: string,
	data: unknown,
	validate: AjvValidateFunction<T>, // FIXME: define type AjvValidateFunction<T>
): T {
	const isValid = validate(data)
	if (isValid) return data as T // AJV narrows to T here

	// console.log(data)
	// console.log(validate.errors)

	const errors = validate.errors?.map(
		(error) => `${error.instancePath} - ${error.message}`,
	)
	throw new Error(`[${label}] validation failed: ${errors}`)
}

export function parseBlock(label: string, data: unknown): Block {
	return parseOrThrow(label, data, BlockValidator)
}

export function parseSection(label: string, data: unknown): Section {
	return parseOrThrow(label, data, SectionValidator)
}

export function parseDoc(label: string, data: unknown): Doc {
	return parseOrThrow(label, data, DocValidator)
}

export function parsePreset(label: string, data: unknown): Preset {
	return parseOrThrow(label, data, PresetValidator)
}

export function parseBase(label: string, data: unknown): FrontmatterBase {
	return parseOrThrow(label, data, FrontmatterBaseValidator)
}

export function parseStructure(
	label: string,
	data: unknown,
): FrontmatterStructure {
	return parseOrThrow(label, data, FrontmatterStructureValidator)
}

/**
 * Parse primitive values
 */
export function parseSlugValue(label: string, data: unknown): Slug {
	return parseOrThrow(label, {value: data}, SlugValidator).value
}

export function parseLanguageValue(label: string, data: unknown): DocLanguage {
	return parseOrThrow(label, {value: data}, LanguageValidator).value
}

export function parsePathValue(label: string, data: unknown): Path {
	return parseOrThrow(label, {value: data}, PathValidator).value
}

export function parseDateValue(label: string, data: unknown): DateString {
	return parseOrThrow(label, {value: data}, DateStringValidator).value
}
