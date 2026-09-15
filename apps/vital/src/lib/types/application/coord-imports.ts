import type {
	SeedDoc,
	FrontmatterSeed,
	FrontmatterStructure,
	IAggregateDataLifecycle,
	ImportStatus,
	IAggregateDocs,
} from '$types'
import type {UiStatus} from '@fat-fuzzy/ui'

export interface ICoordinateImports {
	readonly aggDocs: IAggregateDocs
	readonly aggDataLifecycle: IAggregateDataLifecycle
	readonly loading: boolean
	readonly error: boolean
	readonly status: ImportStatus
	readonly withBackup: boolean
	readonly statusLabel: string
	readonly statusFeedback: UiStatus | undefined
	readonly import: string

	init(
		frontmatter: FrontmatterSeed,
		seed?: {content: SeedDoc[]; structures: FrontmatterStructure[]},
	): Promise<void>

	reset(): void

	setStatus(status: ImportStatus): void

	setDeleteStrategy(withBackup: boolean): void

	checkSeed(): Promise<{date_seed?: string; source?: string} | undefined>

	initSeed(
		frontmatter: FrontmatterSeed,
		seed: SeedDoc[],
	): Promise<{
		docs: {seeded: number}
		base: {seeded: number}
		structure: {seeded: number}
	} | void>

	restoreFromBackup(jsonString: string): Promise<void>

	deleteAllContent(withBackup?: boolean): Promise<void>
}
