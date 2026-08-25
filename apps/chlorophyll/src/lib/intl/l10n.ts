import type {UiStatus} from '@fat-fuzzy/ui'
import type {ImportStatus} from '$types'

export const CTA_TO_TITLE: {[key: string]: string} = {
	edit: 'Content',
	build: 'Structure',
	preview: 'Preview',
	print: 'Print',
}

export const CTA_TO_DESCRIPTION: {[key: string]: string} = {
	edit: 'Focus on your core message. Make your voice heard.',
	build: 'Structure content to tell your story. Save and modify presets.',
	preview: 'Check your work in progress. Compare content blocks or presets.',
	print: 'Save to PDF using your browser.',
}

export const STATUS_LABEL: Record<ImportStatus, string> = {
	idle: 'Choose delete strategy and proceed',
	seeding: 'Seeding...',
	deleting: 'Deleting storage...',
	ready: 'Ready to source data',
	'backing-up': 'Backing up...',
	importing: 'Importing...',
	done: 'All done!',
	error: `Error`,
}

export const STATUS_FEEDBACK: Record<ImportStatus, UiStatus | undefined> = {
	idle: undefined,
	seeding: undefined,
	deleting: undefined,
	ready: undefined,
	'backing-up': undefined,
	importing: undefined,
	done: 'success',
	error: 'error',
}
