import type {Doc, Section} from '$types'

export const DOC_ID = crypto.randomUUID()
export const SECTION_IDS = [crypto.randomUUID(), crypto.randomUUID()]
export const SUBSECTION_IDS = [crypto.randomUUID(), crypto.randomUUID()]
export const BLOCK_IDS = [crypto.randomUUID(), crypto.randomUUID()]

const _SECTIONS: Section[] = [
	{
		content: undefined,
		content_type: 'section',
		id: SECTION_IDS[0],
		name: SECTION_IDS[0],
		parentId: DOC_ID,
		rank: 1,
		subsections: [
			{
				blocks: [
					{
						content: {
							html: '',
							json: {},
						},
						content_type: 'block',
						group: 'section-1',
						id: BLOCK_IDS[0],
						name: 'section-1-block-1',
						parentId: SECTION_IDS[0],
						rank: 1,
						tags: [],
					},
				],
				name: 'section-1',
				parent: SECTION_IDS[0],
				rank: 1,
			},
			{
				blocks: [
					{
						content: {
							html: '',
							json: {},
						},
						content_type: 'block',
						group: 'section-2',
						id: BLOCK_IDS[1],
						name: 'section-2-block-1',
						parentId: SECTION_IDS[0],
						rank: 1,
						tags: [],
					},
				],
				name: 'section-2',
				parent: SECTION_IDS[0],
				rank: 2,
			},
		],
		subtitle: undefined,
		title: undefined,
	},
]

export const TEST_DOC: Doc = {
	id: DOC_ID,
	schema_version: '0.1',
	meta: {
		id: DOC_ID,
		content_type: 'seed',
		format: 'long',
		label: 'en-long',
		language: 'en',
		name: 'en-long',
	},
	path: {
		filename: 'en-long',
		filetype: 'json',
	},
	sections: _SECTIONS,
}

export const SECTIONS: Section[] = [
	{
		id: SECTION_IDS[0],
		parentId: DOC_ID,
		rank: 1,
		name: 'section-1',
		title: 'Seed Section 1',
		content_type: 'section',
		subsections: [
			{
				name: 'section-1-sub-1',
				parent: 'section-1',
				rank: 1,
				blocks: [],
			},
		],
		content: {
			html: '',
			json: {},
		},
	},
	{
		id: SECTION_IDS[1],
		parentId: DOC_ID,
		rank: 2,
		name: 'section-2',
		title: 'Seed Section 2',
		content_type: 'section',
		subsections: [
			{
				name: 'section-2-sub-1',
				parent: 'section-2',
				rank: 1,
				blocks: [],
			},
		],
		content: {
			html: '',
			json: {},
		},
	},
]
