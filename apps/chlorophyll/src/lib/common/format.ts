export const getSectionKey = (language: string, format: string, name: string) =>
	`${language}:${format}:${name}`

export const getSubsectionKey = (
	language: string,
	format: string,
	section: string,
	name: string,
) => `${language}:${format}:${section}:${name}`

export const getBlockKey = (
	language: string,
	format: string,
	section: string,
	name: string,
	subsection?: string,
) =>
	subsection
		? `${language}:${format}:${section}:${subsection}:${name}`
		: `${language}:${format}:${section}:${name}`

export const getPresetKey = (name: string) => name

export const getTagKey = (group: string, name: string) => `${group}:${name}`
