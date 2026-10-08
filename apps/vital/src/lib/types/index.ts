export * from '#lib/types/actions.js'
export * from '#lib/types/intl.js'
export * from '#lib/types/ui.js'
export * from '#lib/types/messages.js'
export * from '#lib/types/migrations.js'

// Storage
export * from '#lib/types/storage/fs-base.js'
export * from '#lib/types/storage/fs-storage.js'
export * from '#lib/types/storage/fs-markdowns.js'

// Service Interfaces
export * from '#lib/types/aggregates/agg-docs.js'
export * from '#lib/types/aggregates/agg-preset.js'
export * from '#lib/types/aggregates/agg-meta.js'
export * from '#lib/types/aggregates/agg-data-lifecycle.js'

// Use case coordinators
export * from '#lib/types/application/coord-compare.js'
export * from '#lib/types/application/coord-docs.js'
export * from '#lib/types/application/coord-metadata.js'
export * from '#lib/types/application/coord-exports.js'
export * from '#lib/types/application/coord-imports.js'
export * from '#lib/types/application/coord-presets.js'

// Domain + Identity
export * from '#lib/generated/types/Doc.js'
export * from '#lib/generated/types/Preset.js'
export * from '#lib/generated/types/Human.js'

// Seed + Markdown
export * from '#lib/generated/types/SeedDoc.js'
export * from '#lib/generated/types/FrontmatterBase.js'
export * from '#lib/generated/types/FrontmatterStructure.js'

// Forms + Transfer
export * from '#lib/generated/types/FormPreset.js'
export * from '#lib/generated/types/FormSection.js'
export * from '#lib/generated/types/FormBlock.js'
export * from '#lib/generated/types/FormTag.js'

// Routing constants & types
export * from '#lib/generated/types/Namespaces.js'

/*************************************************
 ******* OVERRIDE duplicate generated types ******
 ********* ( src: always domain/identity ) *******/

export type {Query} from '#lib/types/messages.js'
export type {Username} from '#lib/generated/types/Human.js'
export type {SeedType} from '#lib/generated/types/SeedDoc.js'
export type {Title} from '#lib/generated/types/FormSection.js'

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
} from '#lib/generated/types/Doc.js'
