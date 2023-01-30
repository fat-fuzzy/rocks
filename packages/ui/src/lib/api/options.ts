import type {ComponentType} from 'svelte'
export type ComponentChild = string | ComponentType | (string | ComponentType)[]
export enum StyleEnum {
	icon = 'icon',
	size = 'size',
	brightness = 'brightness',
	contrast = 'contrast',
	container = 'container',
	content = 'content',
	breakpoint = 'breakpoint',
	app = 'app',
	variant = 'variant',
	color = 'color',
	layout = 'layout',
}
export type ComponentProps = {
	icon?: string
	size?: string
	brightness?: string
	contrast?: string
	app?: string
	container?: string
	content?: string
	breakpoint?: string
	variant?: string
	color?: string
	layout?: string
}
export enum AppEnum {
	ui = 'ui',
	doc = 'doc',
	website = 'website',
}

export type StyleOption = {
	name: string
	input: string
	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components
	items: Array<{id: string; label: string; asset?: string | SVGElement; options?: StyleOption[]}>
}

/**
{
	theme?: {input: string; items: Array<{id: string; value: string}>}
	icon?: {input: string; items: Array<{id: string; value: string; asset: SVGElement}>}
	size?: {input: string; items: Array<{id: string; value: string}>}
	variant?: {input: string; items: Array<{id: string; value: string}>}
	color?: {input: string; items: Array<{id: string; value: string}>}
	layout?: {input: string; items: Array<{id: string; value: string}>}
	action?: {input: string; items: Array<{id: string; value: string}>}
}
 */

export interface Styles {
	[key: string]: string | string[] | StyleOption[] | undefined
}

export interface StyleFamily extends Styles {
	name?: string
	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components
	items?: StyleOption[]
}

export interface ApiOptions {
	[key: string]: StyleFamily
}

export interface AppOptions extends ApiOptions {
	// theme: StyleFamily  // TODO : figure out if it is possible to do a dynamic import of app theme
	settings: StyleFamily
}
export interface SharedOptions extends ApiOptions {
	context: StyleFamily
}
export interface BlockOptions extends ApiOptions {
	variant: StyleFamily
	color: StyleFamily
	icon: StyleFamily
}
export interface LayoutOptions extends ApiOptions {
	content: StyleFamily
}

export const app: AppOptions = {
	settings: {
		name: 'Settings',
		layout: 'switcher',
		items: [
			{
				name: 'Brightness',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'day', label: 'day'},
					{id: 'night', label: 'night'},
				],
			},
			{
				name: 'Contrast',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'contrast', label: 'contrast'}, // TODO : fix color vars & classes
					{id: 'blend', label: 'blend'},
					// {id: 'polar', label: 'polar'},
				],
			},
		],
	},
	// TODO : figure out if it is possible to do a dynamic import of app theme
	// theme: {
	// 	name: 'Theme',
	// 	items: [
	// 		{
	// 			name: 'Theme',
	// 			input: 'toggle',
	// 			layout: 'switcher',
	// 			items: [
	// 				{id: 'ui', label: 'ui'},
	// 				{id: 'doc', label: 'doc'},
	// 				{id: 'website', label: 'website'},
	// 			],
	// 		},
	// 	],
	// },
}

export const shared: SharedOptions = {
	context: {
		name: 'Context',
		layout: 'switcher',
		items: [
			{
				name: 'Layout',
				input: 'toggle',
				layout: 'stack',
				exclude: ['layouts', 'Button', 'Toggle'],
				items: [
					{id: 'stack', label: 'stack'},
					{
						id: 'switcher',
						label: 'switcher',
						options: [
							{
								name: 'Breakpoint',
								input: 'toggle',
								layout: 'stack',
								exclude: ['Button', 'Toggle', 'Nav', 'Stack', 'Burrito'],
								items: [
									{id: 'xs', label: 'xs'},
									{id: 'sm', label: 'sm'},
									{id: 'md', label: 'md'},
									{id: 'lg', label: 'lg'},
									{id: 'xl', label: 'xl'},
								],
							},
						],
					},
				],
			},
			{
				name: 'Size',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'xs', label: 'xs'},
					{id: 'sm', label: 'sm'},
					{id: 'md', label: 'md'},
					{id: 'lg', label: 'lg'},
					{id: 'xl', label: 'xl'},
				],
			},
			{
				name: 'Breakpoint',
				input: 'toggle',
				layout: 'stack',
				exclude: ['blocks', 'Button', 'Toggle', 'Nav', 'Stack', 'Burrito'],
				items: [
					{id: 'xs', label: 'xs'},
					{id: 'sm', label: 'sm'},
					{id: 'md', label: 'md'},
					{id: 'lg', label: 'lg'},
					{id: 'xl', label: 'xl'},
				],
			},
			{
				name: 'Container',
				input: 'toggle',
				layout: 'switcher',
				exclude: [/* 'layouts', */ 'Button', 'Toggle', 'Stack', 'Burrito', 'Sidebar'],
				items: [
					{id: 'center', label: 'center'},
					{id: 'text', label: 'text'},
					{id: 'burrito', label: 'burrito'},
				],
			},
		],
	},
}

export const blocks: BlockOptions = {
	variant: {
		name: 'Variant',
		items: [
			{
				name: 'Variant',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: '', label: 'default'},
					{id: 'outline', label: 'outline'},
					{id: 'bare', label: 'bare'},
				],
			},
		],
	},
	color: {
		name: 'Color',
		items: [
			{
				name: 'Color',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'primary', label: 'primary'},
					{id: 'accent', label: 'accent'},
					{id: 'highlight', label: 'highlight'},
				],
			},
		],
	},
	icon: {
		name: 'Icon',
		exclude: ['ButtonMenu', 'ToggleMenu'],
		layout: 'stack',
		items: [
			{
				name: 'Icon',
				input: 'datalist',
				items: [
					{id: 'idea', label: 'idea', asset: '💡'},
					{id: 'user', label: 'user', asset: '🦁'},
					{id: 'favorite', label: 'favorite', asset: '❤️'},
				],
			},
		],
	},
}

export const layouts: LayoutOptions = {
	content: {
		name: 'Content',
		layout: 'switcher',
		items: [
			{
				name: 'Content',
				input: 'toggle',
				layout: 'stack',
				exclude: ['Sidebar'],
				items: [
					{id: 'card', label: 'card'},
					{id: 'form', label: 'form'},
					{id: 'text', label: 'text'},
				],
			},
			{
				name: 'Side',
				input: 'toggle',
				layout: 'stack',
				include: ['Sidebar'],
				items: [
					{id: 'card', label: 'card'},
					{id: 'form', label: 'form'},
					{id: 'text', label: 'text'},
				],
			},
			{
				name: 'Main',
				input: 'toggle',
				layout: 'stack',
				include: ['Sidebar'],
				items: [
					{id: 'card', label: 'card'},
					{id: 'form', label: 'form'},
					{id: 'text', label: 'text'},
				],
			},
		],
	},
}

export const API_OPTIONS: {[target: string]: ApiOptions} = {app, shared, blocks, layouts}

export const DEFAULT_OPTIONS: {
	app: AppOptions
	shared: SharedOptions
	blocks: BlockOptions
	layouts: LayoutOptions
} = {
	app: {
		settings: {
			brightness: 'day',
			contrast: 'low',
		} /* theme: {theme: 'ui'} // TODO : figure out if it is possible to do a dynamic import of app theme */,
	},
	shared: {
		context: {size: 'md', breakpoint: '', layout: 'switcher', container: 'center'},
	},
	blocks: {
		variant: {variant: ''},
		color: {color: ''},
		// theme: {theme: 'ui'}, // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component content): maybe: use web components ?
		icon: {icon: '✨'},
	},
	layouts: {
		content: {content: 'card', side: 'card', main: 'text'},
	},
}
