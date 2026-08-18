import type {
	DocMeta,
	DocPath,
	FileExt,
	DocContentType,
	Doc,
	Section,
	Block,
	SeedDoc,
	SeedSection,
	SeedBlock,
} from '$types'

import {SCHEMA_VERSION} from '$config/setup'

function seedBlockToBlock(
	seed: SeedBlock,
	parentId: string,
	group: string,
	rank: number,
): Block {
	return {
		content_type: 'block',
		id: crypto.randomUUID(),
		name: seed.name,
		rank,
		content: seed.content,
		group,
		tags: seed.tags,
		parentId,
	}
}

function seedSectionToSection(
	seed: SeedSection,
	parentId: string,
	rank: number,
	sectionContent?: SeedSection[],
): Section {
	const sectionId = crypto.randomUUID()
	const sectionName = seed.meta.name

	const subsections = sectionContent
		? sectionContent.map((sub, i) => {
				return {
					name: sub.meta.name,
					parent: sectionName,
					rank: i + 1,
					blocks: (sub.meta.blocks ?? []).map((b, i) =>
						seedBlockToBlock(b, sectionId, sub.meta.name, i + 1),
					),
				}
			})
		: undefined

	return {
		content_type: 'section',
		id: sectionId,
		name: seed.meta.name,
		title: seed.meta.title,
		subtitle: seed.meta.subtitle,
		rank,
		parentId,
		content: !subsections ? seed.content : undefined,
		subsections,
	}
}

export function seedDocToDoc(seed: SeedDoc): Doc {
	const docId = crypto.randomUUID()

	const meta: DocMeta = {
		id: docId,
		name: `${seed.language}-${seed.format}`,
		label: `${seed.language}-${seed.format}`,
		language: seed.language,
		format: seed.format,
		content_type: 'seed',
	}

	const path: DocPath = {
		filename: `${seed.language}-${seed.format}`,
		filetype: 'json',
	}

	const sections: Section[] = seed.sections
		.map((sectionContent, i) => {
			if (sectionContent.length === 0) {
				return
			}
			const head = sectionContent[0]

			if (sectionContent.length === 1 && !head.meta.blocks) {
				// Case: section contains content OR blocks
				return seedSectionToSection(head, docId, i + 1)
			}

			const sectionName = head.path.parent ?? `section-${i}`

			const seedSection = {
				path: {
					filename: sectionName,
					filetype: 'json' as FileExt,
				},
				meta: {
					content_type: 'section' as DocContentType,
					name: sectionName,
					label: sectionName,
					language: seed.language,
					format: seed.format,
				},
				content: {html: '', json: {}},
			}

			// Section with sub-sections: map subsections as blocks with a group
			const section = seedSectionToSection(
				seedSection,
				docId,
				i + 1,
				sectionContent,
			)

			return section
		})
		.filter((section) => section !== undefined)

	const doc: Doc = {
		schema_version: SCHEMA_VERSION,
		id: docId,
		path,
		meta,
		sections,
	}

	return doc
}
