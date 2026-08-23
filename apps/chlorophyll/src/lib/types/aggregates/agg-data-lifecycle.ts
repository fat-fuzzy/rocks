import type {SeedDoc, FrontmatterSeed, FrontmatterStructure} from '$types'

export interface IAggregateDataLifecycle {
	readonly seeded: {date_seed?: string; source?: string}
	readonly export: {type: string; meta: Record<string, unknown>; data: string}
	readonly import: string

	init(
		frontmatter: FrontmatterSeed,
		seed?: {content: SeedDoc[]; structures: FrontmatterStructure[]},
	): Promise<void>
	reset(): void

	checkSeed(): Promise<{date_seed?: string; source?: string} | undefined>

	initSeed(
		frontmatter: FrontmatterSeed,
		seed: SeedDoc[],
	): Promise<{
		docs: {seeded: number}
		base: {seeded: number}
		structure: {seeded: number}
	} | void>

	importFromJson(jsonString: string): Promise<void>

	buildJsonForExport(): Promise<string>

	buildMarkdownForExport(): Promise<string>

	deleteAllContent(): Promise<void>
}
