import type {UiStatus} from '@fat-fuzzy/ui'
import type {
	ActionDoc,
	ActionResource,
	ActionTransform,
	DocLanguage,
	ImportStatus,
	Localizations,
} from '$types'

import {APP_NAME} from '$config/setup'

export const LOCALIZATIONS: Localizations = {
	en: {
		experience: 'Experience',
		education: 'Education & Development',
		skills: 'Main Skills',
		cv: 'Resume',
	},
	fr: {
		experience: 'Expérience',
		education: 'Formation et Développement Professionnel',
		skills: 'Compétences Clés',
		cv: 'CV',
	},
}

export const CTA_TO_TITLE: {[key: string]: string} = {
	edit: 'Content',
	build: 'Structure',
	preview: 'Preview',
	compare: 'Compare',
	print: 'Print',
	reflect: 'Reflect',
	explore: 'Explore',
	write: 'Write',
	analyze: 'Analyze',
	engage: 'Engage',
}

export const CTA_TO_ACTION_DOC: {[key: string]: string} = {
	edit: 'Edit',
	build: 'Build',
	compare: 'Compare',
	print: 'Print',
}

export const CTA_TO_ACTION_RESOURCE: {[key: string]: string} = {
	write: 'Write',
	reflect: 'Reflect',
	explore: 'Explore',
}

export const CTA_TO_ACTION_TRANSFORM: {[key: string]: string} = {
	analyze: 'Analyze',
	engage: 'Engage',
}
export const CTA_TO_ACTION: {[key: string]: {[key: string]: string}} = {
	chlorophyll: CTA_TO_ACTION_DOC,
	pollen: CTA_TO_ACTION_RESOURCE,
	mycelium: CTA_TO_ACTION_TRANSFORM,
}

export const CTA_TO_DESCRIPTION: {[key: string]: string} = {
	edit: 'Create and edit content.',
	build: 'Structure content and Presets.',
	compare: 'Preview and compare content.',
	print: 'Save or print a document in PDF format.',
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

export function getPrefix(
	language: DocLanguage,
	cta?: ActionDoc | ActionResource | ActionTransform,
) {
	return cta === 'print' ? `${LOCALIZATIONS[language].cv}_` : `${APP_NAME} | `
}
