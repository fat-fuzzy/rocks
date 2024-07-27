import {StyleInputGroup, StyleFamily} from '$lib/api/styles.types'

const brightness = {
	initial: 'day',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'brightness.day', text: 'day', asset: 'day', value: 'day'},
		{
			id: 'brightness.night',
			text: 'night',
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
			text: 'contrast',
			asset: 'contrast',
			value: 'contrast',
		},
		{
			id: 'contrast.blend',
			text: 'blend',
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
		{id: 'container.center', text: 'center', value: 'center'},
		{id: 'container.burrito', text: 'burrito', value: 'burrito'},
	],
}

const size = {
	initial: 'md',
	input: 'range',
	layout: 'stack',
	size: 'xs',
	container: 'card',
	items: [
		{id: 'size.xs', text: 'xs', value: 'xs'},
		{id: 'size.sm', text: 'sm', value: 'sm'},
		{id: 'size.md', text: 'md', value: 'md'},
		{id: 'size.lg', text: 'lg', value: 'lg'},
		{id: 'size.xl', text: 'xl', value: 'xl'},
	],
}

const layout = {
	initial: 'switcher',
	input: 'toggle',
	layout: 'switcher',
	size: '2xs',
	container: 'card',
	items: [
		{id: 'layout.stack', text: 'stack', value: 'stack'},
		{
			id: 'layout.switcher',
			text: 'switcher',
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
		{id: 'threshold.xs', text: 'xs', value: 'xs'},
		{id: 'threshold.sm', text: 'sm', value: 'sm'},
		{id: 'threshold.md', text: 'md', value: 'md'},
		{id: 'threshold.lg', text: 'lg', value: 'lg'},
		{id: 'threshold.xl', text: 'xl', value: 'xl'},
	],
}

const breakpoint = {
	initial: 'xl',
	input: 'range',
	layout: 'stack',
	size: 'xs',
	container: 'card',
	items: [
		{id: 'breakpoint.xs', text: 'xs', value: 'xs'},
		{id: 'breakpoint.sm', text: 'sm', value: 'sm'},
		{id: 'breakpoint.md', text: 'md', value: 'md'},
		{id: 'breakpoint.lg', text: 'lg', value: 'lg'},
		{id: 'breakpoint.xl', text: 'xl', value: 'xl'},
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
			text: 'primary',
			variant: 'outline',
			color: 'primary',
			value: 'primary',
		},
		{
			id: 'color.accent',
			text: 'accent',
			variant: 'outline',
			color: 'accent',
			value: 'accent',
		},
		{
			id: 'color.highlight',
			text: 'highlight',
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
		{id: 'variant.fill', text: 'fill', value: 'fill', variant: 'fill'},
		{
			id: 'variant.outline',
			text: 'outline',
			value: 'outline',
			variant: 'outline',
		},
		{id: 'variant.bare', text: 'bare', value: 'bare', variant: 'bare'},
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
			text: 'round',
			value: 'round',
			shape: 'round',
			asset: 'round',
		},
		{
			id: 'shape.square',
			text: 'square',
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
		{id: 'dimensions.video', text: 'video', value: 'video'},
		{id: 'dimensions.twin', text: 'twin', value: 'twin'},
		{id: 'dimensions.square', text: 'square', value: 'square'},
	],
}

const background = {
	initial: 'video',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'background.layer', text: 'layer', value: 'layer'},
		{id: 'background.box', text: 'box', value: 'box'},
		{id: 'background.polar', text: 'polar', value: 'polar'},
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
			text: 'default',
			asset: 'default',
			value: 'default',
		},
		{
			id: 'status.info',
			text: 'info',
			asset: 'info',
			value: 'info',
		},
		{
			id: 'status.success',
			text: 'success',
			asset: 'success',
			value: 'success',
		},
		{
			id: 'status.warning',
			text: 'warning',
			asset: 'warning',
			value: 'warning',
		},
		{
			id: 'status.error',
			text: 'error',
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
		{id: 'context.prose', text: 'prose', value: 'prose'},
		{id: 'context.code', text: 'code', value: 'code'},
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
			text: 'profile',
			value: 'profile',
			asset: 'profile',
			shape: 'square',
		},
		{
			id: 'asset.favorite',
			text: 'favorite',
			value: 'favorite',
			asset: 'favorite',
			shape: 'square',
		},
		{
			id: 'asset.idea',
			text: 'idea',
			value: 'idea',
			asset: 'idea',
			shape: 'square',
		},
		{
			id: 'asset.default',
			text: 'default',
			value: 'default',
			asset: 'default',
			shape: 'square',
		},
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
		{id: 'content.card', text: 'card', value: 'card'},
		{id: 'content.form', text: 'form', value: 'form'},
		{id: 'content.text', text: 'text', value: 'text'},
	],
}

const side = {
	initial: 'card',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'side.card', text: 'card', value: 'card'},
		{id: 'side.form', text: 'form', value: 'form'},
		{id: 'side.text', text: 'text', value: 'text'},
	],
}

const main = {
	initial: 'text',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'bare',
	items: [
		{id: 'main.card', text: 'card', value: 'card'},
		{id: 'main.form', text: 'form', value: 'form'},
		{id: 'main.text', text: 'text', value: 'text'},
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
	props: ['color', 'variant', 'size', 'status', 'context', 'asset', 'shape'],
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
