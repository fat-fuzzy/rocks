import type {Meta, Markdown, Markdowns} from './types'
import {getFamily} from '$lib/api/props/props-style'
import format from '$lib/utils/format'

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

function getElementMeta(markdowns: Markdown[], name: string) {
	let markdown = markdowns.find(({meta}) => {
		meta.title === name
	})
	const meta = markdown ? markdown.meta : {...DEFAULT_META, title: name, slug: name.toLowerCase()}
	return meta
}

function getElementStyleProps(props_style: {[key: string]: {[key: string]: string[]}}) {
	let props: any = {
		style: {},
	}

	if (props_style) {
		const categoryNames = Object.keys(props_style)
		categoryNames.forEach((cat) => {
			const families = props_style[cat]
			const familyNames = Object.keys(families)
			props.style[cat] = {}
			familyNames.forEach((name) => {
				const familyProps = families[name]
				props.style[cat][name] = getFamily(format.capitalize(name), cat, familyProps)
			})
		})
	}
	return props
}

function getElementDoc(props_style: {[key: string]: {[key: string]: string[]}}) {
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

function getElementProps(meta: Meta) {
	const {props_style, props_state} = meta

	let style = getElementStyleProps(props_style)
	let state = props_state
	let doc = getElementDoc(props_style)

	return {style, state, doc}
}
export {getCategoryMarkdowns, getElementMeta, getElementProps}
