import type {AjvValidateFunction} from '@fat-fuzzy/ui'
import type {
	Block,
	Section,
	Doc,
	Preset,
	FrontmatterBase,
	FrontmatterStructure,
} from '$types'

import * as validators from '$lib/generated/ajv/validation/validate.ajv.mjs'

function parseOrThrow<T>(
	label: string,
	data: unknown,
	validate: AjvValidateFunction, // FIXME: define type AjvValidateFunction<T>
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
	return parseOrThrow(label, data, validators.BlockValidationFunction)
}

export function parseSection(label: string, data: unknown): Section {
	return parseOrThrow(label, data, validators.SectionValidationFunction)
}

export function parseDoc(label: string, data: unknown): Doc {
	return parseOrThrow(label, data, validators.DocValidationFunction)
}

export function parsePreset(label: string, data: unknown): Preset {
	return parseOrThrow(label, data, validators.PresetValidationFunction)
}

export function parseBase(label: string, data: unknown): FrontmatterBase {
	return parseOrThrow(label, data, validators.FrontmatterBaseValidationFunction)
}

export function parseStructure(
	label: string,
	data: unknown,
): FrontmatterStructure {
	return parseOrThrow(
		label,
		data,
		validators.FrontmatterStructureValidationFunction,
	)
}
