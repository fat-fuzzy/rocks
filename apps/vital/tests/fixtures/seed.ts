import type {SeedDoc, SeedSection, SeedType} from '$types'
import {DOC_ID, SECTION_IDS} from '$tests/fixtures/doc'

export const SEED_SUBSECTION = {
	id: crypto.randomUUID(),
	name: 'seed-subsection',
}

export const SEED_SECTIONS: SeedSection[] = [
	{
		path: {
			filename: 'section-1',
			filetype: 'json',
			parent: DOC_ID,
		},
		meta: {
			id: SECTION_IDS[0],
			rank: 1,
			name: 'section-1',
			group: SEED_SUBSECTION.name,
			label: 'Seed Section 1',
			title: 'Seed Section 1',
			language: 'en',
			content_type: 'section',
			blocks: [
				{
					name: 'section-1-block-1',
					content: {
						html: '',
						json: {},
					},
					tags: [],
				},
			],
		},
		content: {
			html: '',
			json: {},
		},
	},
	{
		path: {
			filename: 'section-2',
			filetype: 'json',
			parent: DOC_ID,
		},
		meta: {
			id: SECTION_IDS[1],
			rank: 2,
			name: 'section-2',
			group: SEED_SUBSECTION.name,
			label: 'Seed Section 2',
			title: 'Seed Section 2',
			language: 'en',
			content_type: 'section',
			blocks: [
				{
					name: 'section-2-block-1',
					content: {
						html: '',
						json: {},
					},
					tags: [],
				},
			],
		},
		content: {
			html: '',
			json: {},
		},
	},
]

export const SEED_DOC: SeedDoc = {
	schema_version: '0.1',
	seed_type: 'root' as SeedType,
	language: 'en',
	format: 'long',
	sections: [SEED_SECTIONS],
}
