import {StyleInputGroup, StyleFamily} from '$lib/api/styles.types'

const brightness = {
	initial: 'day',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'outline',
	items: [
		{id: 'brightness.day', text: 'day', asset: 'emoji:day', value: 'day'},
		{
			id: 'brightness.night',
			text: 'night',
			asset: 'emoji:night',
			value: 'night',
		},
	],
}

const contrast = {
	initial: 'blend',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'outline',
	items: [
		{
			id: 'contrast.contrast',
			text: 'contrast',
			asset: 'emoji:contrast',
			value: 'contrast',
		},
		{
			id: 'contrast.blend',
			text: 'blend',
			asset: 'emoji:blend', // TODO: night / day asset option
			value: 'blend',
		},
	],
}

const container = {
	initial: 'center',
	input: 'toggle',
	layout: 'stack',
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
	layout: 'stack',
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
	layout: 'switcher',
	size: '2xs',
	container: 'card',
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
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'outline',
	items: [
		{id: 'variant.fill', text: 'fill', value: 'fill'},
		{id: 'variant.outline', text: 'outline', value: 'outline'},
		{id: 'variant.bare', text: 'bare', value: 'bare'},
	],
}

const shape = {
	initial: '',
	input: 'toggle',
	layout: 'switcher',
	size: '2xs',
	variant: 'card',
	items: [
		{id: 'shape.round', text: 'round', value: 'round'},
		{id: 'shape.square', text: 'square', value: 'square'},
	],
}

const dimensions = {
	initial: 'video',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	variant: 'outline',
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
	variant: 'outline',
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
	size: '2xs',
	variant: 'outline',
	items: [
		{
			id: 'status.default',
			text: 'default',
			asset: 'emoji:default',
			value: 'default',
		},
		{
			id: 'status.info',
			text: 'info',
			asset: 'emoji:info',
			value: 'info',
		},
		{
			id: 'status.success',
			text: 'success',
			asset: 'emoji:success',
			value: 'success',
		},
		{
			id: 'status.warning',
			text: 'warning',
			asset: 'emoji:warning',
			value: 'warning',
		},
		{
			id: 'status.error',
			text: 'error',
			asset: 'emoji:error',
			value: 'error',
		},
	],
}

const context = {
	initial: 'form',
	input: 'radio',
	layout: 'stack',
	size: '2xs',
	container: '',
	variant: 'outline',
	items: [
		{id: 'context.form', text: 'form', value: 'form'},
		{id: 'context.code', text: 'code', value: 'code'},
	],
}

const asset = {
	initial: 'default',
	input: 'toggle',
	layout: 'switcher',
	size: '2xs',
	variant: 'card',
	mode: 'radio',
	items: [
		{
			id: 'asset.profile',
			text: 'profile',
			value: 'emoji:profile',
			asset: 'emoji:profile',
		},
		{
			id: 'asset.favorite',
			text: 'favorite',
			value: 'emoji:favorite',
			asset: 'emoji:favorite',
		},
		{
			id: 'asset.idea',
			text: 'idea',
			value: 'emoji:idea',
			asset: 'emoji:idea',
		},
		{
			id: 'asset.default',
			text: 'default',
			value: 'default',
			asset: 'default',
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
	variant: 'outline',
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
	variant: 'outline',
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
	variant: 'outline',
	items: [
		{id: 'main.card', text: 'card', value: 'card'},
		{id: 'main.form', text: 'form', value: 'form'},
		{id: 'main.text', text: 'text', value: 'text'},
	],
}

const settingsFamily = {
	layout: 'flex',
	size: 'xs',
	variant: 'card',
	justify: 'end',
	props: ['brightness', 'contrast'],
}

const elementFamily = {
	layout: 'switcher',
	size: 'xs',
	variant: 'card:xl',
	props: ['color', 'variant', 'size', 'status', 'context', 'asset', 'shape'],
}

const containerFamily = {
	layout: 'switcher',
	size: 'xs',
	variant: 'card',
	props: ['container', 'size'],
}

const layoutFamily = {
	layout: 'switcher',
	container: 'card',
	size: 'xs',
	variant: 'card',
	props: ['layout', 'threshold', 'breakpoint'],
}

const contentFamily = {
	layout: 'switcher',
	size: 'xs',
	variant: 'card',
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
	app: {settings: FAMILIES['settings']},
	tokens: {element: FAMILIES['element']},
	blocks: {element: FAMILIES['element']},
	layouts: {
		element: FAMILIES['layout'],
		container: FAMILIES['container'],
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
