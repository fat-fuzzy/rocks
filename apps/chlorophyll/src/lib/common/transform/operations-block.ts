import type {
	Block,
	DocContentType,
	DocIndex,
	DocLanguage,
	DocStore,
	Prose,
	Rank,
	Section,
	Slug,
	Subsection,
} from '$types'

export function getUpdatedSectionList(options: {
	name: Slug
	title?: string
	group?: string
	rank: Rank
	parent: Slug
	tags: string[]
	languages: DocLanguage[]
	formats: Slug[]
	content: DocStore
}): {
	language: DocLanguage
	format: Slug
	section: Section
}[] {
	const {name, title, group, rank, tags, languages, formats, content} = options

	const sectionsToUpdate: {
		language: DocLanguage
		format: Slug
		section: Section
	}[] = []

	// TODO: enable optional format selection
	// const formats = this.base.formats
	for (const language of languages) {
		for (const format of formats) {
			const doc = content[language]?.[format]

			if (!doc) {
				continue // FIXME: user feedback / create doc ?
			}

			const section = doc.sections?.find((s) => s.name === options.parent)

			if (!section) {
				continue
			}

			const updatedSection = insertBlockInSection({
				name,
				title,
				group,
				rank,
				tags,
				section,
			})

			sectionsToUpdate.push({
				language,
				format,
				section: updatedSection,
			})
		}
	}

	return sectionsToUpdate
}

export function insertBlockInSection(options: {
	name: Slug
	title?: string
	group?: string
	rank: Rank
	tags: string[]
	section: Section
}): Section {
	const section = $state.snapshot(options.section)
	const {rank, name} = options

	// TODO: enable optional format selection
	// const formats = this.base.formats
	// FIXME: a group will be assigned by default if none is chosen by the user (otherwise the block would overwrite the main section content). The name of the group equals the name of the section
	const group = options.group ? options.group : section.name

	const tags = options.tags.length
		? options.tags
		: !options.tags.length || section.content
			? ['untagged']
			: []

	const prose: Prose = {
		html: '<p>Edit block content</p>',
		json: {},
	}

	if (group) {
		const block = {
			id: crypto.randomUUID(),
			parentId: section.id,
			content_type: 'block' as DocContentType,
			rank,
			group,
			name,
			content: prose,
			tags,
		}

		// @ts-expect-error [unknown vs never] type mismatch in Prose's content.json
		section.subsections = updateSubsections({
			group,
			block,
			section,
		})
	} else {
		// @ts-expect-error [unknown vs never] type mismatch in Prose's content.json
		section.content = prose
		section.tags = tags
	}

	return section
}

export function updateBlockInSection(options: {
	language: DocLanguage
	format: Slug
	block: Block
	section: Section
}): Section | void {
	const {block, section} = options

	const sectionToUpdate: Section = $state.snapshot(section)
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

	const sectionToUpdate: Section = $state.snapshot(section)
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

/**
 * @param options section metadata
 */
function updateSubsections(options: {
	group: string
	block: Block // Block to update / create
	section: Section
}): Subsection[] {
	const {section, group, block} = options
	let subsections = section.subsections

	if (!subsections) {
		const subsection = {
			name: group,
			parent: section.name,
			rank: 1,
			blocks: [block],
		}
		subsections = [subsection]
	} else {
		const subsection = subsections.find((s) => s.name === group)
		if (subsection) {
			subsection.blocks.push(block)
		} else {
			const subsection = {
				name: group,
				parent: section.name,
				rank: 1,
				blocks: [block],
			}
			subsections.push(subsection)
		}
	}

	return subsections
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
				updateRanks = updateRanks.concat($state.snapshot(toUpdate))
			}
		}
	}

	return updateRanks
}

/**
 * Get sections per [language*format] for given rank
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
