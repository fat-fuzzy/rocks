import {StyleInputGroup, StyleFamily} from '$lib/api/styles.types'

const brightness = {
	initial: 'day',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'brightness.day', label: 'day', asset: 'day', value: 'day'},
		{
			id: 'brightness.night',
			label: 'night',
			asset: 'night',
			value: 'night',
		},
	],
}

const contrast = {
	initial: 'blend',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{
			id: 'contrast.contrast',
			label: 'contrast',
			asset: 'contrast',
			value: 'contrast',
		},
		{
			id: 'contrast.blend',
			label: 'blend',
			asset: 'blend', // TODO: night / day asset option
			value: 'blend',
		},
	],
}

const container = {
	initial: 'center',
	input: 'toggle',
	layout: 'switcher',
	size: '2xs',
	container: 'card',
	items: [
		{id: 'container.center', label: 'center', value: 'center'},
		{id: 'container.burrito', label: 'burrito', value: 'burrito'},
	],
}

const size = {
	initial: 'md',
	input: 'range',
	layout: 'stack',
	size: 'xs',
	container: 'card',
	items: [
		{id: 'size.xs', label: 'xs', value: 'xs'},
		{id: 'size.sm', label: 'sm', value: 'sm'},
		{id: 'size.md', label: 'md', value: 'md'},
		{id: 'size.lg', label: 'lg', value: 'lg'},
		{id: 'size.xl', label: 'xl', value: 'xl'},
	],
}

const layout = {
	initial: 'switcher',
	input: 'toggle',
	layout: 'switcher',
	size: '2xs',
	container: 'card',
	items: [
		{id: 'layout.stack', label: 'stack', value: 'stack'},
		{
			id: 'layout.switcher',
			label: 'switcher',
			value: 'switcher',
		},
	],
}

const threshold = {
	initial: 'md',
	input: 'range',
	layout: 'stack',
	size: 'xs',
	container: 'card',
	items: [
		{id: 'threshold.xs', label: 'xs', value: 'xs'},
		{id: 'threshold.sm', label: 'sm', value: 'sm'},
		{id: 'threshold.md', label: 'md', value: 'md'},
		{id: 'threshold.lg', label: 'lg', value: 'lg'},
		{id: 'threshold.xl', label: 'xl', value: 'xl'},
	],
}

const breakpoint = {
	initial: 'xl',
	input: 'range',
	layout: 'stack',
	size: 'xs',
	container: 'card',
	items: [
		{id: 'breakpoint.xs', label: 'xs', value: 'xs'},
		{id: 'breakpoint.sm', label: 'sm', value: 'sm'},
		{id: 'breakpoint.md', label: 'md', value: 'md'},
		{id: 'breakpoint.lg', label: 'lg', value: 'lg'},
		{id: 'breakpoint.xl', label: 'xl', value: 'xl'},
	],
}

const color = {
	initial: '',
	input: 'toggle',
	layout: 'stack',
	size: '2xs',
	items: [
		{
			id: 'color.primary',
			label: 'primary',
			variant: 'outline',
			color: 'primary',
			value: 'primary',
		},
		{
			id: 'color.accent',
			label: 'accent',
			variant: 'outline',
			color: 'accent',
			value: 'accent',
		},
		{
			id: 'color.highlight',
			label: 'highlight',
			variant: 'outline',
			color: 'highlight',
			value: 'highlight',
		},
	],
}

const variant = {
	initial: 'fill',
	input: 'toggle',
	layout: 'stack',
	size: '2xs',
	items: [
		{id: 'variant.fill', label: 'fill', value: 'fill', variant: 'fill'},
		{
			id: 'variant.outline',
			label: 'outline',
			value: 'outline',
			variant: 'outline',
		},
		{id: 'variant.bare', label: 'bare', value: 'bare', variant: 'bare'},
	],
}

const shape = {
	initial: '',
	input: 'toggle',
	layout: 'flex',
	size: '2xs',
	items: [
		{
			id: 'shape.round',
			label: 'round',
			value: 'round',
			shape: 'round',
			asset: 'round',
		},
		{
			id: 'shape.square',
			label: 'square',
			value: 'square',
			shape: 'square',
			asset: 'square',
		},
	],
}

const dimensions = {
	initial: 'video',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'dimensions.video', label: 'video', value: 'video'},
		{id: 'dimensions.twin', label: 'twin', value: 'twin'},
		{id: 'dimensions.square', label: 'square', value: 'square'},
	],
}

const background = {
	initial: 'video',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'background.layer', label: 'layer', value: 'layer'},
		{id: 'background.box', label: 'box', value: 'box'},
		{id: 'background.polar', label: 'polar', value: 'polar'},
	],
}

const status = {
	initial: 'default',
	input: 'radio',
	layout: 'stack',
	variant: 'bare',
	items: [
		{
			id: 'status.default',
			label: 'default',
			asset: 'default',
			value: 'default',
		},
		{
			id: 'status.info',
			label: 'info',
			asset: 'info',
			value: 'info',
		},
		{
			id: 'status.success',
			label: 'success',
			asset: 'success',
			value: 'success',
		},
		{
			id: 'status.warning',
			label: 'warning',
			asset: 'warning',
			value: 'warning',
		},
		{
			id: 'status.error',
			label: 'error',
			asset: 'error',
			value: 'error',
		},
	],
}

const context = {
	initial: 'form',
	input: 'radio',
	layout: 'stack',
	variant: 'bare',
	items: [
		{id: 'context.prose', label: 'prose', value: 'prose'},
		{id: 'context.code', label: 'code', value: 'code'},
	],
}

const asset = {
	initial: 'default',
	input: 'toggle',
	layout: 'flex',
	size: '2xs',
	mode: 'radio',
	items: [
		{
			id: 'asset.profile',
			label: 'profile',
			value: 'profile',
			asset: 'profile',
			shape: 'square',
		},
		{
			id: 'asset.favorite',
			label: 'favorite',
			value: 'favorite',
			asset: 'favorite',
			shape: 'square',
		},
		{
			id: 'asset.idea',
			label: 'idea',
			value: 'idea',
			asset: 'idea',
			shape: 'square',
		},
		{
			id: 'asset.default',
			label: 'default',
			value: 'default',
			asset: 'default',
			shape: 'square',
		},
	],
}

const spell = {
	initial: 'card',
	input: 'toggle',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'spell.bleu', label: 'bleu', value: 'bleu'},
		{id: 'spell.sea', label: 'sea', value: 'sea'},
		{id: 'spell.dante', label: 'dante', value: 'dante'},
	],
}

const uno = {
	initial: 'card',
	input: 'toggle',
	layout: 'switcher',
	size: '2xs',
	variant: 'bare',
	items: [
		{
			id: 'uno.tsunami',
			label: 'tsunami',
			value: 'tsunami',
			color: 'highlight',
			shape: 'square',
			asset: 'tsunami',
			assetType: 'svg',
		},
		{
			id: 'uno.water',
			label: 'water',
			value: 'water',
			color: 'highlight',
			shape: 'square',
			asset: 'water',
			assetType: 'svg',
		},
		{
			id: 'uno.sparkles',
			label: 'sparkles',
			value: 'sparkles',
			color: 'highlight',
			shape: 'square',
			asset: 'sparkles',
			assetType: 'svg',
		},
		{
			id: 'uno.egg',
			label: 'egg',
			value: 'egg',
			color: 'highlight',
			shape: 'square',
			asset: 'egg',
			assetType: 'svg',
		},
		{
			id: 'uno.magic',
			label: 'magic',
			value: 'magic',
			color: 'highlight',
			shape: 'square',
			asset: 'magic',
			assetType: 'svg',
		},
	],
}

const due = {
	initial: 'card',
	input: 'toggle',
	layout: 'switcher',
	size: '2xs',
	variant: 'bare',
	items: [
		{
			id: 'due.tsunami',
			label: 'tsunami',
			value: 'tsunami',
			shape: 'square',
			color: 'accent',
			asset: 'tsunami',
			assetType: 'svg',
		},
		{
			id: 'due.water',
			label: 'water',
			value: 'water',
			color: 'accent',
			shape: 'square',
			asset: 'water',
			assetType: 'svg',
		},
		{
			id: 'due.sparkles',
			label: 'sparkles',
			value: 'sparkles',
			color: 'accent',
			shape: 'square',
			asset: 'sparkles',
			assetType: 'svg',
		},
		{
			id: 'due.egg',
			label: 'egg',
			value: 'egg',
			color: 'accent',
			shape: 'square',
			asset: 'egg',
			assetType: 'svg',
		},
		{
			id: 'due.magic',
			label: 'magic',
			value: 'magic',
			color: 'accent',
			shape: 'square',
			asset: 'magic',
			assetType: 'svg',
		},
	],
}

const level = {
	initial: 'card',
	input: 'toggle',
	layout: 'switcher',
	size: '2xs',
	variant: 'bare',
	items: [
		{
			id: 'level.purgatorio',
			label: 'purgatorio',
			value: 'purgatorio',
		},
		{id: 'level.inferno', label: 'inferno', value: 'inferno'},
	],
}

// TODO: Fix asset - SVG / emoji
// const asset = {
// 	emoji,
// 	exclude: ['ButtonMenu', 'ToggleMenu', 'InputRange', 'InputFile'],
// }

const content = {
	initial: 'card',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'content.card', label: 'card', value: 'card'},
		{id: 'content.form', label: 'form', value: 'form'},
		{id: 'content.text', label: 'text', value: 'text'},
	],
}

const side = {
	initial: 'card',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'side.card', label: 'card', value: 'card'},
		{id: 'side.form', label: 'form', value: 'form'},
		{id: 'side.text', label: 'text', value: 'text'},
	],
}

const main = {
	initial: 'text',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'main.card', label: 'card', value: 'card'},
		{id: 'main.form', label: 'form', value: 'form'},
		{id: 'main.text', label: 'text', value: 'text'},
	],
}

const settingsFamily = {
	layout: 'flex',
	size: 'xs',
	justify: 'end',
	props: ['brightness', 'contrast'],
}

const elementFamily = {
	layout: 'switcher',
	size: 'xs',
	props: [
		'color',
		'variant',
		'size',
		'status',
		'context',
		'asset',
		'shape',
		'spell',
		'uno',
		'due',
		'level',
	],
}

const containerFamily = {
	layout: 'switcher',
	size: 'xs',
	container: 'card',
	variant: 'bare',
	props: ['container', 'size'],
}

const layoutFamily = {
	layout: 'switcher',
	size: 'xs',
	container: 'card',
	variant: 'bare',
	props: ['size', 'layout', 'threshold', 'breakpoint'],
}

const contentFamily = {
	layout: 'switcher',
	size: 'xs',
	props: ['content', 'side', 'main'],
}

const FAMILIES: {[key: string]: any} = {
	settings: settingsFamily,
	element: elementFamily,
	container: containerFamily,
	layout: layoutFamily,
	content: contentFamily,
}

const CATEGORIES: {[key: string]: any} = {
	app: {
		name: 'app',
		families: {
			settings: FAMILIES['settings'],
		},
	},
	tokens: {
		name: 'tokens',
		families: {
			element: FAMILIES['container'],
		},
	},
	blocks: {
		name: 'blocks',
		families: {
			element: FAMILIES['element'],
		},
	},
	layouts: {
		name: 'layouts',
		families: {
			layout: FAMILIES['layout'],
			container: FAMILIES['container'],
		},
	},
}

const PROPS_STYLE: {[key: string]: any} = {
	brightness,
	contrast,
	container,
	size,
	layout,
	threshold,
	breakpoint,
	color,
	variant,
	shape,
	spell,
	level,
	uno,
	due,
	dimensions,
	background,
	status,
	context,
	asset,
	content,
	side,
	main,
}

function getInputGroup(name: string, category: string, family: string) {
	const slug = name.toLowerCase()
	return new StyleInputGroup({
		name,
		id: `${category}.${family}.${slug}`,
		value: PROPS_STYLE[slug].initial,
		input: PROPS_STYLE[slug].input,
		layout: PROPS_STYLE[slug].layout,
		size: PROPS_STYLE[slug].size,
		mode: PROPS_STYLE[slug].mode,
		variant: PROPS_STYLE[slug].variant,
		items: PROPS_STYLE[slug].items.map((item) => {
			return {...item, id: `${category}.${family}.${item.id}`}
		}),
	})
}

function getFamily(familyId: string) {
	const [category, family] = familyId.split('.')
	const slug = family
	return new StyleFamily({
		name: slug,
		title: '',
		id: `${category}.${slug}`,
		layout: FAMILIES[slug].layout,
		size: FAMILIES[slug].size,
		variant: FAMILIES[slug].variant,
		items: FAMILIES[slug].props.map((prop) => {
			return getInputGroup(prop, category, slug)
		}),
	})
}

export {PROPS_STYLE, FAMILIES, CATEGORIES, getInputGroup, getFamily}
