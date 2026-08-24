export * from '$lib/types/actions'
export * from '$lib/types/intl'
export * from '$lib/types/ui'
export * from '$lib/types/messages'

// Storage
export * from '$lib/types/storage/fs-base'
export * from '$lib/types/storage/fs-storage'
export * from '$lib/types/storage/fs-markdowns'

// Service Interfaces
export * from '$lib/types/aggregates/agg-docs'
export * from '$lib/types/aggregates/agg-preset'
export * from '$lib/types/aggregates/agg-meta'
export * from '$lib/types/aggregates/agg-data-lifecycle'

// Use case coordinators
export * from '$lib/types/application/coord-docs'
export * from '$lib/types/application/coord-metadata'
export * from '$lib/types/application/coord-exports'
export * from '$lib/types/application/coord-imports'
export * from '$lib/types/application/coord-presets'

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
