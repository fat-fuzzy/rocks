import type {Doc, DocStore, OPFSTreeDoc, Section} from '$types'
import {SCHEMA_VERSION} from '$config/setup'

export const DOC_ID = crypto.randomUUID()
export const SECTION_IDS = [crypto.randomUUID(), crypto.randomUUID()]
export const SUBSECTION_IDS = [crypto.randomUUID(), crypto.randomUUID()]
export const BLOCK_IDS = [crypto.randomUUID(), crypto.randomUUID()]

export const OPFS_SECTIONS: Section[] = [
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

export const TEST_DOC_EN_LONG: Doc = {
	id: DOC_ID,
	schema_version: SCHEMA_VERSION,
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
	sections: OPFS_SECTIONS,
}

export const TEST_DOC_FR_LONG: Doc = {
	id: DOC_ID,
	schema_version: SCHEMA_VERSION,
	meta: {
		id: DOC_ID,
		content_type: 'seed',
		format: 'long',
		label: 'fr-long',
		language: 'fr',
		name: 'fr-long',
	},
	path: {
		filename: 'fr-long',
		filetype: 'json',
	},
	sections: OPFS_SECTIONS,
}

export const OPFS_DOC: OPFSTreeDoc = {
	fr: {
		long: {
			meta: {
				language: 'fr',
				format: 'long',
				name: 'fr',
			},
			content: TEST_DOC_EN_LONG,
		},
	},
	en: {
		long: {
			meta: {
				name: 'long',
				language: 'en',
				format: 'long',
			},
			content: TEST_DOC_FR_LONG,
		},
	},
}

export const DOC_STORE: DocStore = {
	en: {
		long: {
			id: DOC_ID, // FIXME: not relevant for now
			meta: {
				content_type: 'section',
				id: DOC_ID, // FIXME: not relevant for now
				label: 'doc-root',
				name: 'doc-root',
			},
			path: {
				filename: 'doc-root',
				filetype: 'json',
			},
			schema_version: '0.1',
			sections: [],
		},
	},
	fr: {
		long: {
			id: DOC_ID,
			meta: {
				name: 'doc-root',
				id: DOC_ID,
				content_type: 'section',
				label: 'doc-root',
			},
			schema_version: '0.1',
			path: {
				filename: 'doc-root',
				filetype: 'json',
			},
			sections: [],
		},
	},
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
				parent: SECTION_IDS[0],
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
				parent: SECTION_IDS[0],
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
