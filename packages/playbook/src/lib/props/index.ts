import type {
	Meta,
	Markdown,
	Markdowns,
	PlaybookProps,
	StyleProps,
} from './types'
import {getFamily} from '$lib/props/props-style'

const DEFAULT_META: Meta = {
	title: '',
	slug: '',
	status: '',
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
		default:
			return []
	}
}

function getElementMeta(name: string, markdowns: Markdown[]) {
	const markdown = markdowns.find(({meta}) => {
		meta.title === name
	})
	const meta = markdown
		? markdown.meta
		: {...DEFAULT_META, title: name, slug: name.toLowerCase()}
	return meta
}

function getElementStyleProps(props_style: StyleProps | undefined) {
	const props: any = {
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
	const props: any = []
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

function getElementProps(meta: Meta): PlaybookProps {
	if (!meta) {
		return {}
	}
	const {props_style, props_state, content_types} = meta

	const props: PlaybookProps = {
		style: getElementStyleProps(props_style),
		doc: content_types ?? getElementDoc(content_types),
		state: props_state,
	}
	return props
}
export {getCategoryMarkdowns, getElementMeta, getElementProps}
