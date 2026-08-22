import {DOC_LANGUAGE, DOC_FORMAT, SCHEMA_VERSION} from '$config/setup'
import type {DocMeta, FrontmatterBase, FrontmatterStructure} from '$types'

export const BASE_IDS = [crypto.randomUUID(), crypto.randomUUID()]
export const STRUCTURE_IDS = [crypto.randomUUID(), crypto.randomUUID()]

export const BASE: FrontmatterBase = {
	schema_version: SCHEMA_VERSION,
	seed_type: 'root',
	name: 'doc-root',
	path: {
		filename: 'base',
		filetype: 'json',
	},
	languages: [DOC_LANGUAGE],
	formats: [DOC_FORMAT],
	tags: [],
	settings: [],
}

export const RAW_BASE: {content: FrontmatterBase; meta: DocMeta} = {
	content: BASE,
	meta: {
		content_type: 'doc-root',
		name: 'doc-root',
		label: 'Doc Base',
		id: BASE_IDS[0],
	},
}

export const STRUCTURE: FrontmatterStructure = {
	schema_version: SCHEMA_VERSION,
	seed_type: 'backup',
	name: 'doc-long',
	path: {
		filename: 'base',
		filetype: 'json',
	},
	format: DOC_FORMAT,
	sections: [],
}

export const RAW_STRUCTURE: {
	content: {structure: FrontmatterStructure[]}
	meta: DocMeta
} = {
	content: {structure: [STRUCTURE]},
	meta: {
		content_type: 'doc-root',
		name: 'doc-long',
		label: 'Doc Long',
		id: STRUCTURE_IDS[0],
	},
}
