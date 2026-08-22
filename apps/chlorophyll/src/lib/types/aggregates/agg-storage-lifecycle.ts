import type {
	SeedDoc,
	FrontmatterSeed,
	FrontmatterStructure,
	Prose,
} from '$types'

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

	importFromJSON(jsonString: string): Promise<void>

	buildFullJSON(): Promise<string>

	buildFullMarkdown(options: {
		root: string
		content: {[id: string]: Prose}
		presets: {id: string; query: string}[]
	}): string

	deleteAllContent(): Promise<void>
}
