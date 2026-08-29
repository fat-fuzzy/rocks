import type {ActionCrud, InputCheckedTypes, Slug, TagGroup, Uuid} from '$types'

/******************************
 * Tag (InputGroup) Utilities
 ******************************/
export const getTagInputPrefix = (cta: ActionCrud, id?: Uuid) =>
	id ? `${cta}-${id}` : cta

export const getTagGroupName = (cta: ActionCrud, name: string, id?: Uuid) =>
	`${getTagInputPrefix(cta, id)}-${name}`

// Use input value since selectAll input is not included in the input group (FIXME: has no name)
export const checkSelectAll = (
	cta: ActionCrud,
	inputType: InputCheckedTypes,
	targetData: string,
) => inputType === 'checkbox' && targetData.indexOf(`all-${cta}-`) >= 0

export const parseGroupFromTargetData = (
	cta: ActionCrud,
	targetData: string, // name or value
	inputType: InputCheckedTypes,
	isSelectAll: boolean,
	id?: string,
) => {
	const groupPrefix = isSelectAll && inputType === 'checkbox' ? 'all-' : ''
	const prefix = `${groupPrefix}${getTagInputPrefix(cta, id)}-`

	return String(targetData).substring(prefix.length)
}

export function applyTags(options: {
	cta: ActionCrud
	value: Slug
	name?: Slug
	type: InputCheckedTypes
	id?: Uuid // Id of the element to [tag/untag]
	currentTags: Slug[] // Current tags of the element to [tag/untag]
	tagGroups: TagGroup[]
}): Slug[] {
	const {cta, value, name, type, id, currentTags, tagGroups} = options

	// Check if the input is a "select all" input and get the group name if any
	const isSelectAll = checkSelectAll(cta, type, value)
	if (!isSelectAll && !name) {
		throw Error('Input group selection is missing group name')
	}

	const groupName = parseGroupFromTargetData(
		cta,
		isSelectAll ? value : name || value,
		type,
		isSelectAll,
		id,
	)

	const tagGroup = tagGroups.find((g) => g.name === groupName)
	if (!tagGroup) {
		throw Error(`Cannot find tag group ${groupName}`)
	}
	const groupItems = tagGroup.items
	if (!groupItems || groupItems.length === 0) {
		throw Error(`Tag group ${groupName} is empty`)
	}

	let updatedTags: Slug[] = [...currentTags]

	if (type === 'radio') {
		updatedTags = updatedTags.filter((t) => !tagGroup.items.includes(t))
		updatedTags.push(value)
	} else {
		if (!isSelectAll) {
			if (!updatedTags.includes(value)) {
				updatedTags.push(value)
			} else {
				updatedTags = updatedTags.filter((t) => t !== value)
			}
		} else {
			const tagsInBlock = []

			if (cta === 'delete') {
				updatedTags = []
			} else {
				for (const tag of groupItems) {
					if (updatedTags.includes(tag)) {
						tagsInBlock.push(tag)
					}
				}

				// Retain all tags not in this group (doing this to avoid duplicates later)
				// TODO: use Set
				updatedTags = updatedTags.filter((t) => !groupItems.includes(t))

				// If Block contains all tags already, selectAll will remove them all
				if (tagsInBlock.length === groupItems.length) {
					// Do nothing
				} else {
					// Else it will add them all
					updatedTags = [...updatedTags, ...groupItems]
				}
			}
		}

		if (id !== 'delete-tags') {
			// We are updating tags for a block or section
			// TODO: clean this
			if (updatedTags.length === 0) {
				updatedTags = ['untagged']
			} else if (updatedTags.length > 1 && updatedTags.includes('untagged')) {
				updatedTags = updatedTags.filter((t) => t !== 'untagged')
			}
		}
	}

	return updatedTags
}

export function checkTags(tags: string[], selected: string[]) {
	return selected.filter((s) => tags.includes(s))
}

export function isHidden(tags: string[], selected: string[]) {
	if (tags.includes('hidden') && !selected.includes('hidden')) {
		return true
	}
}
