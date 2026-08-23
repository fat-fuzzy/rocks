import {defineDefinitions} from '../index.js'

const EnumsSchema = defineDefinitions({
	seedType: {
		type: 'string',
		enum: ['base', 'structure', 'root'],
	},
	docContentType: {
		type: 'string',
		enum: ['section', 'block', 'seed', 'doc-root', 'preset'],
	},
	docVersion: {
		type: 'string',
		enum: ['free', 'ft'],
	},
	docHeader: {
		type: 'string',
		enum: ['header', 'summary'],
	},
	docSection: {
		type: 'string',
		enum: ['skills', 'experience', 'education', 'training', 'publications'],
	},
	docVisibility: {
		type: 'string',
		enum: ['public', 'internal', 'sensitive', 'restricted'],
	},
	docStatus: {
		type: 'string',
		enum: ['draft', 'published', 'archived'],
	},
	fileExt: {
		type: 'string',
		enum: ['md', 'json', 'txt'],
	},
	importStatus: {
		type: 'string',
		enum: [
			'idle',
			'clearing',
			'backing-up',
			'ready',
			'importing',
			'done',
			'error',
		],
	},
	uiDialogState: {
		type: 'string',
		enum: ['idle', 'loading', 'visible', 'closed', 'cancelled'],
	},
})

export default EnumsSchema
