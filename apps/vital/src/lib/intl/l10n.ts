import type {UiStatus} from '@fat-fuzzy/ui'
import type {
	ImportStatus,
	Localizations,
	LabelsForNamespace,
	LabelsForRoutes,
	NamespaceKey,
} from '$types'

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

export const NAMESPACE_TO_TITLE: LabelsForNamespace = {
	pollen: 'Pollen',
	chlorophyll: 'Chlorophyll',
}

export const NAMESPACE_TO_PRESET_LABEL: LabelsForNamespace = {
	pollen: 'Pathway',
	chlorophyll: 'Preset',
}

export const CTA_TO_TITLE: LabelsForRoutes<NamespaceKey> = {
	edit: 'Content',
	build: 'Structure',
	preview: 'Preview',
	compare: 'Compare',
	reflect: 'Reflect',
	explore: 'Explore',
	write: 'Write',
	// analyze: 'Analyze',
	// engage: 'Engage',
}

export const CTA_TO_LABEL: LabelsForRoutes<NamespaceKey> = {
	edit: 'Edit',
	build: 'Build',
	compare: 'Compare',
	preview: 'Preview',
	write: 'Write',
	reflect: 'Reflect',
	explore: 'Explore',
	// analyze: 'Analyze',
	// engage: 'Engage',
}

export const CTA_TO_DESCRIPTION: LabelsForRoutes<NamespaceKey> = {
	edit: 'Create and edit content.',
	build: 'Structure content and Presets.',
	compare: 'Preview and compare content.',
	preview: 'Preview a document, save or print in PDF format.',
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
