import type {UiStatus} from '@fat-fuzzy/ui'
import type {ImportStatus, Localizations} from '$types'

export const LOCALIZATIONS: Localizations = {
	en: {
		experience: 'Experience',
		skills: 'Skills',
	},
	fr: {
		experience: 'Expérience',
		skills: 'Compétences',
	},
}

export const CTA_TO_TITLE: {[key: string]: string} = {
	edit: 'Content',
	build: 'Structure',
	compare: 'Compare',
	print: 'Print',
}

export const CTA_TO_ACTION: {[key: string]: string} = {
	edit: 'Edit',
	build: 'Build',
	compare: 'Compare',
	print: 'Print',
}

export const CTA_TO_DESCRIPTION: {[key: string]: string} = {
	edit: 'Focus on your core message. Make your voice heard.',
	build: 'Structure content to tell your story. Save and modify presets.',
	compare: 'Check your work in progress. Compare content blocks or presets.',
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
