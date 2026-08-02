export * from '$lib/types/domain/ui'
export * from '$lib/types/domain/actions'
export * from '$lib/types/domain/services'
export * from '$lib/types/storage/fs-base'
export * from '$lib/types/storage/fs-storage'
export * from '$lib/types/storage/fs-markdowns'
export * from '$lib/types/transfer/messages'
export * from '$lib/types/intl'

// Domain + Identity
export * from '$lib/generated/types/Document'
export * from '$lib/generated/types/Preset'
export * from '$lib/generated/types/Human'

// Seed + Markdown
export * from '$lib/generated/types/SeedDocument'
export * from '$lib/generated/types/FrontmatterBase'
export * from '$lib/generated/types/FrontmatterStructure'

// Forms + Transfer
export * from '$lib/generated/types/FormPreset'
export * from '$lib/generated/types/FormSection'
export * from '$lib/generated/types/FormBlock'
export * from '$lib/generated/types/FormTag'

/*************************************************
 ******* OVERRIDE duplicate generated types ******
 ********* ( src: always domain/identity ) *******/

export type {Query} from '$lib/types/transfer/messages'
export type {Username, Date} from '$lib/generated/types/Human'
export type {SeedType} from '$lib/generated/types/SeedDocument'
export type {Title} from '$lib/generated/types/FormSection'

export type {
	Uuid,
	Text,
	Rank,
	Slug,
	FileExt,
	DocPath,
	DocMeta,
	DocContentType,
	DocLanguage,
	DocFormat,
	DocVisibility,
	Path,
	Prose,
} from '$lib/generated/types/Document'
