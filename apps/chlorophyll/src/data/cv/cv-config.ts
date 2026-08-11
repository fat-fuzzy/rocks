import type {MarkdownStructure, Slug} from '$types'

const PATHS_CV_L10N_FORMATS: MarkdownStructure = {
	en: {
		pathPrefix: '/assets/in/cv/en/',
		header: import.meta.glob('/assets/in/cv/en/*-header.md'),
		summary: import.meta.glob('/assets/in/cv/en/*-summary.md'),
		skills: {
			long: import.meta.glob('/assets/in/cv/en/long/*-skills.md'),
			short: import.meta.glob('/assets/in/cv/en/short/*-skills.md'),
		},
		experience: {
			long: import.meta.glob('/assets/in/cv/en/long/experience/*.md'),
			short: import.meta.glob('/assets/in/cv/en/short/experience/*.md'),
		},
		education: {
			long: import.meta.glob('/assets/in/cv/en/long/*-education.md'),
			short: import.meta.glob('/assets/in/cv/en/short/*-education.md'),
		},
		training: {
			long: import.meta.glob('/assets/in/cv/en/long/*-training.md'),
			short: import.meta.glob('/assets/in/cv/en/short/*-training.md'),
		},
		publications: {
			long: import.meta.glob('/assets/in/cv/en/long/*-publications.md'),
			short: import.meta.glob('/assets/in/cv/en/short/*-publications.md'),
		},
	},
	fr: {
		pathPrefix: '/assets/in/cv/fr/',
		header: import.meta.glob('/assets/in/cv/fr/*-header.md'),
		summary: import.meta.glob('/assets/in/cv/fr/*-summary.md'),
		skills: {
			long: import.meta.glob('/assets/in/cv/fr/long/*-skills.md'),
			short: import.meta.glob('/assets/in/cv/fr/short/*-skills.md'),
		},
		experience: {
			long: import.meta.glob('/assets/in/cv/fr/long/experience/*.md'),
			short: import.meta.glob('/assets/in/cv/fr/short/experience/*.md'),
		},
		education: {
			long: import.meta.glob('/assets/in/cv/fr/long/*-education.md'),
			short: import.meta.glob('/assets/in/cv/fr/short/*-education.md'),
		},
		training: {
			long: import.meta.glob('/assets/in/cv/fr/long/*-training.md'),
			short: import.meta.glob('/assets/in/cv/fr/short/*-training.md'),
		},
		publications: {
			long: import.meta.glob('/assets/in/cv/fr/long/*-publications.md'),
			short: import.meta.glob('/assets/in/cv/fr/short/*-publications.md'),
		},
	},
}

const PATH_PREFIX_STRUCTURE = '/assets/in/cv/structure/'
const PATHS_STRUCTURE: {
	[format: string]: Record<string, () => Promise<unknown>>
} = {
	base: import.meta.glob('/assets/in/cv/structure/cv-base.md'),
	long: import.meta.glob('/assets/in/cv/structure/cv-long.md'),
	short: import.meta.glob('/assets/in/cv/structure/cv-short.md'),
}

// The known top-level section keys on SeedDoc
export const SECTION_KEYS: Slug[] = [
	'header',
	'summary',
	'skills',
	'experience',
	'education',
	'training',
	'publications',
] as const

export type SectionKey = (typeof SECTION_KEYS)[number]

const CV_HEADER: Slug[] = ['header', 'summary']

const CV_SECTIONS: Slug[] = [
	'skills',
	'experience',
	'education',
	'training',
	'publications',
]

const NESTED_SECTIONS = ['experience']

export {
	PATH_PREFIX_STRUCTURE,
	PATHS_STRUCTURE,
	PATHS_CV_L10N_FORMATS,
	CV_HEADER,
	CV_SECTIONS,
	NESTED_SECTIONS,
}
