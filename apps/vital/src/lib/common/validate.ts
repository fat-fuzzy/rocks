import type {AjvValidateFunction, ErrorObject} from '@fat-fuzzy/ui'
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
	FormTag,
	FormPreset,
	Uuid,
} from '$types'

import * as validators from '$lib/generated/ajv/validation/validate.ajv.mjs'

function getTypedValidatorFunction<T>(
	fn: (data: unknown) => boolean,
): AjvValidateFunction<T> {
	const wrapped = ((data: unknown): data is T =>
		fn(data)) as AjvValidateFunction<T>
	wrapped.errors = undefined
	Object.defineProperty(wrapped, 'errors', {
		get: () => (fn as {errors?: ErrorObject[] | null}).errors,
	})
	return wrapped
}

export const BlockValidator = getTypedValidatorFunction<Block>(
	validators.BlockValidationFunction,
)

export const SectionValidator = getTypedValidatorFunction<Section>(
	validators.SectionValidationFunction,
)

export const DocValidator = getTypedValidatorFunction<Doc>(
	validators.DocValidationFunction,
)

export const PresetValidator = getTypedValidatorFunction<Preset>(
	validators.PresetValidationFunction,
)

export const FrontmatterBaseValidator =
	getTypedValidatorFunction<FrontmatterBase>(
		validators.FrontmatterBaseValidationFunction,
	)

export const SlugValidator = getTypedValidatorFunction<{value: Slug}>(
	validators.SlugValueValidationFunction,
)

export const UuidValidator = getTypedValidatorFunction<{value: Uuid}>(
	validators.UuidValueValidationFunction,
)

export const LanguageValidator = getTypedValidatorFunction<{
	value: DocLanguage
}>(validators.LanguageValueValidationFunction)

export const FrontmatterStructureValidator =
	getTypedValidatorFunction<FrontmatterStructure>(
		validators.FrontmatterStructureValidationFunction,
	)

export const PathValidator = getTypedValidatorFunction<{value: Path}>(
	validators.PathValueValidationFunction,
)

export const DateStringValidator = getTypedValidatorFunction<{
	value: DateString
}>(validators.DateStringValueValidationFunction)

export const FormBlockValidator = getTypedValidatorFunction<Block>(
	validators.FormBlockValidationFunction,
)

export const FormFormatValidator = getTypedValidatorFunction<Slug>(
	validators.FormFormatValidationFunction,
)

export const FormPresetValidator = getTypedValidatorFunction<FormPreset>(
	validators.FormPresetValidationFunction,
)

export const FormTagValidator = getTypedValidatorFunction<FormTag>(
	validators.FormTagValidationFunction,
)

export const FormLanguageValidator = getTypedValidatorFunction<DocLanguage>(
	validators.FormLanguageValidationFunction,
)

export const FormSectionValidator = getTypedValidatorFunction<Section>(
	validators.FormSectionValidationFunction,
)
