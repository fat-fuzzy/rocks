import {SCHEMA_VERSION} from '$config/setup'

export const PRESETS_IDS = [crypto.randomUUID(), crypto.randomUUID()]

export const PRESETS = [
	{
		description: 'A preset for [en x long]',
		schema_version: SCHEMA_VERSION,
		name: 'preset-1',
		id: PRESETS_IDS[0],
		query: '?language=en&format=long',
		locked: false,
	},
]

export const RAW_PRESETS = [
	{
		content: PRESETS[0],
		meta: {
			filename: PRESETS[0].name,
			filetype: 'json',
		},
	},
]
