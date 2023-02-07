import type {ComponentType} from 'svelte'
export type ComponentChild = string | ComponentType | (string | ComponentType)[]
export enum StyleEnum {
	asset = 'asset',
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
export interface ComponentProps {
	id?: string
	asset?: string
	size?: string
	label?: string
	text?: string
	brightness?: string
	contrast?: string
	app?: string
	container?: string
	content?: string
	breakpoint?: string
	variant?: string
	color?: string
	layout?: string
	// options?: StyleOption
}
export interface InputProps extends ComponentProps {
	label?: string
}
export interface ButtonProps extends ComponentProps {
	text?: string
	type?: string
	asset?: string
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
	items: Array<ComponentProps>
}

/**
{
	theme?: {input: string; items: Array<{id: string; value: string}>}
	asset?: {input: string; items: Array<{id: string; value: string; asset: SVGElement}>}
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
	asset: StyleFamily
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
					{id: 'day', text: 'day', asset: '☀️'},
					{id: 'night', text: 'night', asset: '🌙'},
				],
			},
			{
				name: 'Contrast',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'contrast', text: 'contrast', asset: '🌗'}, // TODO : fix color vars & classes
					{id: 'blend', text: 'blend', asset: '🌑'}, // TODO: night / day asset option
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
					{id: 'stack', text: 'stack', asset: ''},
					{
						id: 'switcher',
						text: 'switcher',
						asset: '',
						// options: [
						// 	//TODO: display breakpoint options conditionally
						// 	{
						// 		name: 'Breakpoint',
						// 		input: 'toggle',
						// 		layout: 'stack',
						// 		exclude: ['Button', 'Toggle', 'Nav', 'Stack', 'Burrito'],
						// 		items: [
						// 			{id: 'xs', text: 'xs', asset: ''},
						// 			{id: 'sm', text: 'sm', asset: ''},
						// 			{id: 'md', text: 'md', asset: ''},
						// 			{id: 'lg', text: 'lg', asset: ''},
						// 			{id: 'xl', text: 'xl', asset: ''},
						// 		],
						// 	},
						// ],
					},
				],
			},
			{
				name: 'Size',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'xs', text: 'xs', asset: ''},
					{id: 'sm', text: 'sm', asset: ''},
					{id: 'md', text: 'md', asset: ''},
					{id: 'lg', text: 'lg', asset: ''},
					{id: 'xl', text: 'xl', asset: ''},
				],
			},
			{
				name: 'Breakpoint',
				input: 'toggle',
				layout: 'stack',
				exclude: ['Button', 'Toggle', 'Nav', 'Stack', 'Burrito'],
				items: [
					{id: 'xs', text: 'xs', asset: ''},
					{id: 'sm', text: 'sm', asset: ''},
					{id: 'md', text: 'md', asset: ''},
					{id: 'lg', text: 'lg', asset: ''},
					{id: 'xl', text: 'xl', asset: ''},
				],
			},
			{
				name: 'Container',
				input: 'toggle',
				layout: 'switcher',
				exclude: [/* 'layouts', */ 'Button', 'Toggle', 'Stack', 'Burrito', 'Sidebar'],
				items: [
					{id: 'center', text: 'center', asset: ''},
					{id: 'text', text: 'text', asset: ''},
					{id: 'burrito', text: 'burrito', asset: ''},
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
					{id: '', text: 'default', asset: ''},
					{id: 'outline', text: 'outline', asset: ''},
					{id: 'bare', text: 'bare', asset: ''},
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
					{id: 'primary', text: 'primary', variant: 'outline', color: 'primary', asset: ''},
					{id: 'accent', text: 'accent', variant: 'outline', color: 'accent', asset: ''},
					{id: 'highlight', text: 'highlight', variant: 'outline', color: 'highlight', asset: ''},
				],
			},
		],
	},
	asset: {
		name: 'Asset',
		exclude: ['ButtonMenu', 'ToggleMenu'],
		layout: 'stack',
		items: [
			{
				name: 'Emoji',
				input: 'datalist',
				items: [
					{id: 'idea', text: 'idea', asset: '💡'},
					{id: 'user', text: 'user', asset: '🦁'},
					{id: 'favorite', text: 'favorite', asset: '❤️'},
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
					{id: 'card', text: 'card', asset: ''},
					{id: 'form', text: 'form', asset: ''},
					{id: 'text', text: 'text', asset: ''},
				],
			},
			{
				name: 'Side',
				input: 'toggle',
				layout: 'stack',
				include: ['Sidebar'],
				items: [
					{id: 'card', text: 'card', asset: ''},
					{id: 'form', text: 'form', asset: ''},
					{id: 'text', text: 'text', asset: ''},
				],
			},
			{
				name: 'Main',
				input: 'toggle',
				layout: 'stack',
				include: ['Sidebar'],
				items: [
					{id: 'card', text: 'card', asset: ''},
					{id: 'form', text: 'form', asset: ''},
					{id: 'text', text: 'text', asset: ''},
				],
			},
		],
	},
}

export const API_OPTIONS: {[target: string]: ApiOptions} = {app, shared, blocks, layouts}

export const DEFAULT_OPTIONS: {[target: string]: ApiOptions} = {
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
		asset: {emoji: '✨'},
	},
	layouts: {
		content: {content: 'card', side: 'card', main: 'text'},
	},
}
