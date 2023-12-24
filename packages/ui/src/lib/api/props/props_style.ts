import {StyleInputGroup, StyleFamily} from '$lib/api/styles/types'

const brightness = {
	initial: 'day',
	input: 'radio',
	layout: 'stack',
	size: 'sm',
	variant: 'box card',
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
	size: 'sm',
	variant: 'box card',
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
	size: 'sm',
	container: 'card',
	items: [
		{id: 'container.center', text: 'center', value: 'center'},
		{id: 'container.burrito', text: 'burrito', value: 'burrito'},
	],
	exclude: ['Stack', 'Burrito'],
}

const size = {
	initial: 'md',
	input: 'range',
	layout: 'stack',
	size: 'sm',
	container: 'card',
	items: [
		{id: 'size.xs', text: 'xs', value: 'xs'},
		{id: 'size.sm', text: 'sm', value: 'sm'},
		{id: 'size.md', text: 'md', value: 'md'},
		{id: 'size.lg', text: 'lg', value: 'lg'},
		{id: 'size.xl', text: 'xl', value: 'xl'},
	],
	exclude: ['Nav', 'Stack', 'Burrito'],
}

const layout = {
	initial: 'switcher',
	input: 'toggle',
	layout: 'stack',
	size: 'sm',
	container: 'card',
	items: [
		{id: 'layout.stack', text: 'stack', value: 'stack'},
		{
			id: 'layout.switcher',
			text: 'switcher',
			value: 'switcher',
		},
	],
	exclude: [
		'recipes',
		'layouts',
		'Switcher',
		'Reveal',
		'Stack',
		'Switcher',
		'Burrito',
		'Sidebar',
		'Nav',
		'RevealNav',
		'Header',
		'LogIn',
		'InputCheck',
		'InputRadio',
		'InputFile',
		'InputRange',
	],
}

const threshold = {
	initial: 'md',
	input: 'range',
	layout: 'stack',
	size: 'sm',
	container: 'card',
	items: [
		{id: 'threshold.xs', text: 'xs', value: 'xs'},
		{id: 'threshold.sm', text: 'sm', value: 'sm'},
		{id: 'threshold.md', text: 'md', value: 'md'},
		{id: 'threshold.lg', text: 'lg', value: 'lg'},
		{id: 'threshold.xl', text: 'xl', value: 'xl'},
	],
	exclude: [
		'blocks',
		'recipes',
		'layouts',
		'Switcher',
		'Reveal',
		'Stack',
		'Switcher',
		'Burrito',
		'Sidebar',
		'Nav',
		'Header',
		'LogIn',
		'InputCheck',
		'InputRadio',
		'InputFile',
		'InputRange',
	],
	include: ['RevealNav', 'ButtonMenu', 'ToggleMenu', 'Switcher'],
}

const breakpoint = {
	initial: 'xl',
	input: 'range',
	layout: 'stack',
	size: 'sm',
	container: 'card',
	items: [
		{id: 'breakpoint.xs', text: 'xs', value: 'xs'},
		{id: 'breakpoint.sm', text: 'sm', value: 'sm'},
		{id: 'breakpoint.md', text: 'md', value: 'md'},
		{id: 'breakpoint.lg', text: 'lg', value: 'lg'},
		{id: 'breakpoint.xl', text: 'xl', value: 'xl'},
	],
	exclude: [
		'recipes',
		'layouts',
		'Reveal',
		'Stack',
		'Switcher',
		'Sidebar',
		'Burrito',
		'Sidebar',
		'Nav',
		'RevealNav',
		'LogIn',
		'ButtonMenu',
		'ToggleMenu',
		'RevealMenu',
		'InputCheck',
		'InputRadio',
		'InputFile',
		'InputRange',
	],
	include: ['RevealAuto'],
}

const color = {
	initial: '',
	input: 'toggle',
	layout: 'switcher',
	size: 'xxs',
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
	exclude: ['Feedback'],
}

const variant = {
	initial: 'fill',
	input: 'radio',
	layout: 'stack',
	size: 'sm',
	variant: 'box card',
	items: [
		{id: 'variant.fill', text: 'fill', value: 'fill'},
		{id: 'variant.outline', text: 'outline', value: 'outline'},
		{id: 'variant.bare', text: 'bare', value: 'bare'},
	],
	exclude: ['InputCheck', 'InputRadio', 'InputRange', 'InputFile'],
}

const status = {
	initial: 'default',
	input: 'radio',
	layout: 'stack',
	size: 'sm',
	variant: 'box card',
	items: [
		{
			id: 'status.default',
			text: 'default',
			color: 'default',
			asset: 'emoji:default',
			value: 'default',
		},
		{
			id: 'status.info',
			text: 'info',
			color: 'info',
			asset: 'emoji:info',
			value: 'info',
		},
		{
			id: 'status.success',
			text: 'success',
			color: 'success',
			asset: 'emoji:success',
			value: 'success',
		},
		{
			id: 'status.warning',
			text: 'warning',
			color: 'warning',
			asset: 'emoji:warning',
			value: 'warning',
		},
		{
			id: 'status.error',
			text: 'error',
			color: 'error',
			asset: 'emoji:error',
			value: 'error',
		},
	],
	exclude: [
		'Button',
		'Expand',
		'Switch',
		'Toggle',
		'InputCheck',
		'InputFile',
		'InputRadio',
		'InputRange',
	],
	include: ['Feedback'],
}

const context = {
	initial: 'form',
	input: 'radio',
	layout: 'stack',
	size: 'sm',
	container: '',
	variant: 'box card',
	items: [
		{id: 'context.form', text: 'form', value: 'form'},
		{id: 'context.code', text: 'code', value: 'code'},
	],
	exclude: [
		'Button',
		'Expand',
		'Switch',
		'Toggle',
		'InputCheck',
		'InputFile',
		'InputRadio',
		'InputRange',
	],
	include: ['Feedback'],
}

const asset = {
	initial: 'default',
	input: 'toggle',
	layout: 'switcher',
	size: 'xxs',
	variant: 'card',
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
			value: 'emoji',
			asset: 'emoji',
		},
	],
	exclude: ['Switch', 'ButtonMenu', 'ToggleMenu', 'InputRange', 'InputFile'],
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
	size: 'sm',
	variant: 'box card',
	items: [
		{id: 'content.card', text: 'card', value: 'card'},
		{id: 'content.form', text: 'form', value: 'form'},
		{id: 'content.text', text: 'text', value: 'text'},
	],
	exclude: ['layouts', 'Sidebar'],
	include: ['Burrito', 'Reveal', 'RevealAuto', 'Stack', 'Switcher'],
}

const side = {
	initial: 'card',
	input: 'radio',
	layout: 'stack',
	size: 'sm',
	variant: 'box card',
	items: [
		{id: 'side.card', text: 'card', value: 'card'},
		{id: 'side.form', text: 'form', value: 'form'},
		{id: 'side.text', text: 'text', value: 'text'},
	],
	exclude: ['layouts'],
	include: ['Sidebar'],
}

const main = {
	initial: 'text',
	input: 'radio',
	layout: 'stack',
	size: 'sm',
	variant: 'box card',
	items: [
		{id: 'main.card', text: 'card', value: 'card'},
		{id: 'main.form', text: 'form', value: 'form'},
		{id: 'main.text', text: 'text', value: 'text'},
	],
	exclude: ['layouts'],
	include: ['Sidebar', 'Switcher'],
}

const settingsFamily = {
	layout: 'flex',
	size: 'lg',
	variant: 'card',
	props: ['Brightness', 'Contrast'],
}

const elementFamily = {
	layout: 'switcher',
	size: 'xs',
	variant: 'card:xl',
	props: ['Color', 'Variant', 'Size', 'Status', 'Context', 'Emoji'],
}

const containerFamily = {
	layout: 'flex grow',
	size: 'lg',
	variant: 'card',
	props: ['Container', 'Size'],
	exclude: ['Color', 'Typography', 'Button', 'Expand', 'Switch', 'Toggle', 'RevealAuto'],
}

const layoutFamily = {
	layout: 'flex grow',
	container: 'card',
	size: 'lg',
	variant: '',
	props: ['Layout', 'Threshold', 'Breakpoint'],
	exclude: [
		'Color',
		'Typography',
		'Button',
		'Expand',
		'Switch',
		'Toggle',
		'Feedback',
		'RevealAuto',
	],
}

const contentFamily = {
	layout: 'switcher',
	size: 'md',
	variant: 'card',
	props: ['Content', 'Side', 'Main'],
}

const FAMILIES: {[key: string]: any} = {
	settings: settingsFamily,
	element: elementFamily,
	container: containerFamily,
	layout: layoutFamily,
	content: contentFamily,
}

const PROPS: {[key: string]: any} = {
	brightness,
	contrast,
	container,
	size,
	layout,
	threshold,
	breakpoint,
	color,
	variant,
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
		value: PROPS[slug].initial,
		input: PROPS[slug].input,
		layout: PROPS[slug].layout,
		size: PROPS[slug].size,
		variant: PROPS[slug].variant,
		items: PROPS[slug].items.map((item) => {
			return {...item, id: `${category}.${family}.${item.id}`}
		}),
		include: PROPS[slug].include,
		exclude: PROPS[slug].exclude,
	})
}

function getFamily(name: string, category: string, props: string[]) {
	const slug = name.toLowerCase()
	return new StyleFamily({
		name,
		title: '',
		id: `${category}.${slug}`,
		layout: FAMILIES[slug].layout,
		size: FAMILIES[slug].size,
		variant: FAMILIES[slug].variant,
		items: props.map((prop) => {
			return getInputGroup(prop, category, slug)
		}),
		include: FAMILIES[slug].include,
		exclude: FAMILIES[slug].exclude,
	})
}

export {PROPS, getInputGroup, getFamily}
