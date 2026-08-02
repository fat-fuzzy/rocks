export function checkTags(tags: string[], selected: string[]) {
	return selected.filter((s) => tags.includes(s))
}

export function isHidden(tags: string[], selected: string[]) {
	if (tags.includes('hidden') && !selected.includes('hidden')) {
		return true
	}
}
