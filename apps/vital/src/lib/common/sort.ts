import type {Block, Section, SeedSection} from '$types'

export function sortByNameAsc(a: SeedSection, b: SeedSection) {
	return a.meta.name < b.meta.name ? -1 : b.meta.name < a.meta.name ? 1 : 0
}
export function sortByNameDesc(a: SeedSection, b: SeedSection) {
	return a.meta.name > b.meta.name ? -1 : b.meta.name > a.meta.name ? 1 : 0
}

export function sortByRankAsc(a: Section | Block, b: Section | Block) {
	return a.rank < b.rank ? -1 : b.rank < a.rank ? 1 : 0
}
export function sortByRankDesc(a: Section | Block, b: Section | Block) {
	return a.rank > b.rank ? -1 : b.rank > a.rank ? 1 : 0
}
