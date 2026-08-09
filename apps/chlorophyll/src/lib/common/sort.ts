import type {SeedSection} from '$types'

function sortByNameAsc(a: SeedSection, b: SeedSection) {
	return a.meta.name < b.meta.name ? -1 : b.meta.name < a.meta.name ? 1 : 0
}
function sortByNameDesc(a: SeedSection, b: SeedSection) {
	return a.meta.name > b.meta.name ? -1 : b.meta.name > a.meta.name ? 1 : 0
}

export default {
	sortByNameAsc,
	sortByNameDesc,
}
