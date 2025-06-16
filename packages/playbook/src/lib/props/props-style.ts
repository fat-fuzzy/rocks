import StyleFamily from '$lib/api/styles.family'
import StyleInputGroup from '$lib/api/styles.input-group'

const brightness = {
	initial: 'day',
	input: 'toggle',
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
	input: 'toggle',
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
	initial: 'taco',
	input: 'toggle',
	layout: 'flex grow ',
	size: '2xs',
	container: 'ravioli',
	items: [
		{id: 'container.taco', label: 'taco', value: 'taco', asset: 'taco'},
		{
			id: 'container.burrito',
			label: 'burrito',
			value: 'burrito',
			asset: 'burrito',
		},
	],
}

const size = {
	initial: 'md',
	input: 'range',
	layout: 'stack',
	size: 'xs',
	container: 'ravioli',
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
	layout: 'flex grow ',
	size: '2xs',
	container: 'ravioli',
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
	container: 'ravioli',
	items: [
		{id: 'threshold.xs', label: 'xs', value: 'xs', parent: 'layout.switcher'},
		{id: 'threshold.sm', label: 'sm', value: 'sm', parent: 'layout.switcher'},
		{id: 'threshold.md', label: 'md', value: 'md', parent: 'layout.switcher'},
		{id: 'threshold.lg', label: 'lg', value: 'lg', parent: 'layout.switcher'},
		{id: 'threshold.xl', label: 'xl', value: 'xl', parent: 'layout.switcher'},
	],
}

const breakpoint = {
	initial: 'xl',
	input: 'range',
	layout: 'stack',
	size: 'xs',
	container: 'ravioli',
	items: [
		{id: 'breakpoint.xs', label: 'xs', value: 'xs'},
		{id: 'breakpoint.sm', label: 'sm', value: 'sm'},
		{id: 'breakpoint.md', label: 'md', value: 'md'},
		{id: 'breakpoint.lg', label: 'lg', value: 'lg'},
		{id: 'breakpoint.xl', label: 'xl', value: 'xl'},
	],
}

const color = {
	initial: 'primary',
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
	initial: 'none',
	input: 'toggle',
	layout: 'flex',
	size: '2xs',
	items: [
		{
			id: 'shape.round',
			title: 'round',
			value: 'round',
			shape: 'round',
			asset: 'round',
		},
		{
			id: 'shape.square',
			title: 'square',
			value: 'square',
			shape: 'square',
			asset: 'square',
		},
		{
			id: 'shape.pill',
			title: 'pill',
			value: 'pill',
			shape: 'pill',
			asset: 'pill',
		},
		{
			id: 'shape.mellow',
			title: 'mellow',
			value: 'mellow',
			shape: 'mellow',
			asset: 'mellow',
		},
		{
			id: 'shape.soft',
			title: 'soft',
			value: 'soft',
			shape: 'soft',
			asset: 'soft',
		},
		{
			id: 'shape.none',
			label: 'none',
			value: '',
			shape: '',
			asset: '',
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
	variant: 'outline',
	container: 'ravioli',
	size: '2xs',
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
	initial: 'prose',
	input: 'radio',
	layout: 'stack',
	variant: 'outline',
	container: 'ravioli',
	size: '2xs',
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
			title: 'profile',
			value: 'profile',
			asset: 'profile',
			shape: 'square',
		},
		{
			id: 'asset.favorite',
			title: 'favorite',
			value: 'favorite',
			asset: 'favorite',
			shape: 'square',
		},
		{
			id: 'asset.idea',
			title: 'idea',
			value: 'idea',
			asset: 'idea',
			shape: 'square',
		},
		{
			id: 'asset.default',
			title: 'default',
			value: 'default',
			asset: 'default',
			shape: 'square',
		},
	],
}

const spell = {
	subgroup: 'spell',
	initial: 'bleu',
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

const level = {
	subgroup: 'spell',
	initial: 'paradiso',
	input: 'toggle',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{
			id: 'level.inferno',
			label: 'inferno',
			value: 'inferno',
			parent: 'spell.dante',
		},
		{
			id: 'level.purgatorio',
			label: 'purgatorio',
			value: 'purgatorio',
			parent: 'spell.dante',
		},
		{
			id: 'level.paradiso',
			label: 'paradiso',
			value: '',
		},
	],
}

const uno = {
	subgroup: 'genie',
	initial: 'magic',
	input: 'toggle',
	layout: 'flex grow',
	size: '2xs',
	variant: 'bare',
	items: [
		{
			id: 'uno.tsunami',
			title: 'tsunami',
			value: 'tsunami',
			color: 'highlight',
			shape: 'square',
			asset: 'tsunami',
			assetType: 'svg',
		},
		{
			id: 'uno.water',
			title: 'water',
			value: 'water',
			color: 'highlight',
			shape: 'square',
			asset: 'water',
			assetType: 'svg',
		},
		{
			id: 'uno.sparkles',
			title: 'sparkles',
			value: 'sparkles',
			color: 'highlight',
			shape: 'square',
			asset: 'sparkles',
			assetType: 'svg',
		},
		{
			id: 'uno.egg',
			title: 'egg',
			value: 'egg',
			color: 'highlight',
			shape: 'square',
			asset: 'egg',
			assetType: 'svg',
		},
		{
			id: 'uno.magic',
			title: 'magic',
			value: 'magic',
			color: 'highlight',
			shape: 'square',
			asset: 'magic',
			assetType: 'svg',
		},
	],
}

const due = {
	subgroup: 'genie',
	initial: 'sparkles',
	input: 'toggle',
	layout: 'flex grow',
	size: '2xs',
	variant: 'bare',
	items: [
		{
			id: 'due.tsunami',
			title: 'tsunami',
			value: 'tsunami',
			shape: 'square',
			color: 'accent',
			asset: 'tsunami',
			assetType: 'svg',
		},
		{
			id: 'due.water',
			title: 'water',
			value: 'water',
			color: 'accent',
			shape: 'square',
			asset: 'water',
			assetType: 'svg',
		},
		{
			id: 'due.sparkles',
			title: 'sparkles',
			value: 'sparkles',
			color: 'accent',
			shape: 'square',
			asset: 'sparkles',
			assetType: 'svg',
		},
		{
			id: 'due.egg',
			title: 'egg',
			value: 'egg',
			color: 'accent',
			shape: 'square',
			asset: 'egg',
			assetType: 'svg',
		},
		{
			id: 'due.magic',
			title: 'magic',
			value: 'magic',
			color: 'accent',
			shape: 'square',
			asset: 'magic',
			assetType: 'svg',
		},
	],
}

// TODO: Fix asset - SVG / emoji
// const asset = {
// 	emoji,
// 	exclude: ['ButtonMenu', 'ToggleMenu', 'InputRange', 'InputFile'],
// }

const content = {
	initial: 'ravioli',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'content.ravioli', label: 'ravioli', value: 'ravioli'},
		{id: 'content.form', label: 'form', value: 'form'},
		{id: 'content.text', label: 'text', value: 'text'},
	],
}

const side = {
	initial: 'ravioli',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{
			id: 'side.ravioli',
			label: 'ravioli',
			value: 'ravioli',
			parent: 'layout.sidebar',
		},
		{id: 'side.form', label: 'form', value: 'form', parent: 'layout.sidebar'},
		{id: 'side.text', label: 'text', value: 'text', parent: 'layout.sidebar'},
	],
}

const main = {
	initial: 'text',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{
			id: 'main.ravioli',
			label: 'ravioli',
			value: 'ravioli',
			parent: 'layout.sidebar',
		},
		{id: 'main.form', label: 'form', value: 'form', parent: 'layout.sidebar'},
		{id: 'main.text', label: 'text', value: 'text', parent: 'layout.sidebar'},
	],
}

const settingsFamily = {
	layout: 'switcher',
	size: 'xs',
	justify: 'end',
	props: ['brightness', 'contrast'],
}

const blockFamily = {
	layout: 'flex',
	size: '2xs',
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
	layout: 'flex',
	size: '2xs',
	container: 'ravioli',
	variant: 'bare',
	props: ['container', 'size'],
}

const layoutFamily = {
	layout: 'flex',
	size: '2xs',
	container: 'ravioli',
	variant: 'bare',
	props: ['size', 'layout', 'threshold', 'breakpoint'],
}

const contentFamily = {
	layout: 'flex',
	size: '2xs',
	props: ['content', 'side', 'main'],
}

const FAMILIES: {[key: string]: any} = {
	settings: settingsFamily,
	block: blockFamily,
	container: containerFamily,
	token: containerFamily,
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
			token: FAMILIES['tokens'],
		},
	},
	blocks: {
		name: 'blocks',
		families: {
			block: FAMILIES['blocks'],
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
		container: PROPS_STYLE[slug].container,
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
