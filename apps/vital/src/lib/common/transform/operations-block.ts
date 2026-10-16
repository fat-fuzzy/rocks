import type {
	Block,
	DocContentType,
	DocIndex,
	DocLanguage,
	Section,
	Slug,
} from '#types'

export function updateBlockInSection(options: {
	language: DocLanguage
	format: Slug
	block: Block
	section: Section
}): Section | void {
	const {block, section} = options

	const sectionToUpdate: Section = section
	// 1. If block is not in a group: it is the main content of the section
	if (block.content_type === 'section') {
		sectionToUpdate.content = block.content
		sectionToUpdate.tags = block.tags

		return sectionToUpdate
	} else if (section.subsections) {
		// 2. Block is in a group: find the subsection to update
		section.subsections.forEach((subsection, index) => {
			if (subsection.blocks) {
				const blockIndex = subsection.blocks.findIndex((b) => b.id === block.id)
				if (blockIndex !== -1) {
					if (!sectionToUpdate.subsections) {
						sectionToUpdate.subsections = []
					}
					sectionToUpdate.subsections[index].blocks[blockIndex] = block
				}
			}
		})

		return sectionToUpdate
	}
}

export function deleteBlockInSection(options: {
	name: Slug
	content_type: DocContentType
	group?: string
	parent: Slug
	section: Section
}): Section | void {
	const {group, name, parent, section} = options

	const sectionToUpdate: Section = section
	// Determine subsection:
	// - group is provided
	// - OR or use default subgroup (name = section)
	const groupToUpdate = group ?? parent

	// Case 1: block belongs to default subgroup (name = section)
	if (groupToUpdate === sectionToUpdate.name && !sectionToUpdate.subsections) {
		delete sectionToUpdate.content

		return sectionToUpdate
	} else if (section.subsections) {
		// Case 2: block belongs to named subgroup

		const subsectionIndex = section.subsections.findIndex(
			(s) => s.name === groupToUpdate,
		)
		const subsection = section.subsections[subsectionIndex]

		if (subsection) {
			subsection.blocks = subsection.blocks.filter(
				(b) => b.name !== options.name,
			)
			return sectionToUpdate
		} else {
			throw Error(`Group ${group} for block ${name} not found`)
		}
	} else {
		throw Error(`No groups found for ${section.name}`)
	}
}

export function updateSectionRanks(options: {
	rank: number
	docIndex: DocIndex
}): Section[] {
	const {docIndex, rank} = options
	let updateRanks: Section[] = []
	const maxRank = Object.keys(docIndex.sections).length

	if (options.rank <= 1 || rank < maxRank) {
		for (let i = options.rank; i < maxRank; i++) {
			const toUpdate = getSectionsByRank({docIndex, rank: i})
			if (toUpdate.length) {
				updateRanks = updateRanks.concat(toUpdate)
			}
		}
	}

	return updateRanks
}

/**
 * Get sections per [language * format] for given rank
 * @param rank
 * @returns sections found
 */
export function getSectionsByRank(options: {
	rank: number
	docIndex: DocIndex
}): Section[] {
	const {docIndex, rank} = options

	const sections = Object.values(docIndex.sections)
	return sections.filter((s) => s.rank === rank)
}
