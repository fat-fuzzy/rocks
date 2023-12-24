import type {Meta} from './types'

import {StyleFamily} from '$lib/api/styles/types'
import {FAMILIES, getInputGroup} from './props_style'

function getElementProps(name: string, category: string, meta: Meta) {
	const {props_style, props_state, content_types, group, context} = meta

	const slug = name.toLowerCase()
	const styles = new StyleFamily({
		name,
		title: '',
		id: `${category}.${slug}`,
		layout: FAMILIES[category].layout,
		size: FAMILIES[category].size,
		variant: FAMILIES[category].variant,
		items: props_style.map((prop) => {
			return getInputGroup(prop, category, slug)
		}),
	})

	return {
		styles,
	}
}

export {getElementProps}
