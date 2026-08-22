export * from '$lib/types/actions'
export * from '$lib/types/intl'
export * from '$lib/types/ui'
export * from '$lib/types/messages'

// Storage
export * from '$lib/types/storage/fs-base'
export * from '$lib/types/storage/fs-storage'
export * from '$lib/types/storage/fs-markdowns'

// Service Interfaces
export * from '$lib/types/aggregates/import'
export * from '$lib/types/aggregates/doc'
export * from '$lib/types/aggregates/preset'
export * from '$lib/types/aggregates/meta'

// Use case coordinators
export * from '$lib/types/application/CoordinateDocs'
export * from '$lib/types/application/CoordinateExports'
export * from '$lib/types/application/CoordinateMetadata'

// Domain + Identity
export * from '$lib/generated/types/Doc'
export * from '$lib/generated/types/Preset'
export * from '$lib/generated/types/Human'

// Seed + Markdown
export * from '$lib/generated/types/SeedDoc'
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

export type {Query} from '$lib/types/messages'
export type {Username, Date} from '$lib/generated/types/Human'
export type {SeedType} from '$lib/generated/types/SeedDoc'
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
	DocVisibility,
	Path,
	Prose,
} from '$lib/generated/types/Doc'
