import type {Meta, Markdown, Markdowns, StyleProps} from './types'
import {getFamily} from '$lib/api/props/props-style'

const DEFAULT_META: Meta = {
	title: '',
	slug: '',
	props_state: [],
	content_types: [],
	context: ['app.settings'],
}

function getCategoryMarkdowns(category: string, markdowns: Markdowns) {
	switch (category) {
		case 'tokens':
			return markdowns.tokens
		case 'blocks':
			return markdowns.blocks
		case 'layouts':
			return markdowns.layouts
		case 'recipes':
			return markdowns.recipes
		case 'graphics':
			return markdowns.graphics
		default:
			return []
	}
}

function getElementMeta(name: string, markdowns: Markdown[]) {
	let markdown = markdowns.find(({meta}) => {
		meta.title === name
	})
	const meta = markdown ? markdown.meta : {...DEFAULT_META, title: name, slug: name.toLowerCase()}
	return meta
}

function getElementStyleProps(props_style: StyleProps | undefined) {
	let props: any = {
		style: {},
	}

	if (props_style) {
		const categoryNames = Object.keys(props_style)
		categoryNames.forEach((cat: string) => {
			const families = props_style[cat]
			const familyNames = Object.keys(families)
			props.style[cat] = {}
			familyNames.forEach((name) => {
				props.style[cat][name] = getFamily(`${cat}.${name}`)
			})
		})
	}
	return props
}

function getElementDoc(props_style: StyleProps | undefined) {
	let props: any = []
	let currentCategory: string[] = []

	if (props_style) {
		const categoryNames = Object.keys(props_style)
		categoryNames.forEach((cat) => {
			const families = props_style[cat]
			currentCategory = []
			const familyNames = Object.keys(families)
			familyNames.forEach((name) => {
				currentCategory = currentCategory.concat(families[name])
			})

			props.push({[cat]: currentCategory})
		})
	}

	return props
}

function getElementProps(meta: Meta): StyleProps {
	const {props_style, props_state} = meta

	const props: StyleProps = {}
	props.style = getElementStyleProps(props_style)
	props.doc = getElementDoc(props_style)
	if (props_state) {
		props.state = props_state
	}

	return props
}
export {getCategoryMarkdowns, getElementMeta, getElementProps}
