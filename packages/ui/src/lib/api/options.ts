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
	items: Array<{id: string; label: string; asset?: string | SVGElement}>
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

export interface StyleFamily {
	name: string
	layout?: string
	exclude?: string[]
	items: StyleOption[]
}

export interface ApiOptions {
	[key: string]: StyleFamily
}

export interface AppOptions extends ApiOptions {
	theme: StyleFamily
	settings: StyleFamily
}
export interface SharedOptions extends ApiOptions {
	size: StyleFamily
}
export interface BlockOptions extends ApiOptions {
	variant: StyleFamily
	color: StyleFamily
	icon: StyleFamily
	layout: StyleFamily
}
export interface LayoutOptions extends ApiOptions {
	context: StyleFamily
}

export const app: ApiOptions = {
	settings: {
		name: 'Theme',
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
					{id: 'contrast', label: 'high'}, // TODO : fix color vars & classes
					{id: 'blend', label: 'low'},
					// {id: 'polar', label: 'polar'},
				],
			},
		],
	},
	theme: {
		name: 'App',
		items: [
			{
				name: 'App',
				input: 'toggle',
				layout: 'switcher',
				items: [
					{id: 'ui', label: 'ui'},
					{id: 'doc', label: 'doc'},
					{id: 'website', label: 'website'},
				],
			},
		],
	},
}

export const blocks: ApiOptions = {
	variant: {
		name: 'Variant',
		items: [
			{
				name: 'Variant',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'full', label: 'full'},
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
	layout: {
		name: 'Layout',
		exclude: ['Button', 'Toggle'],
		items: [
			{
				name: 'Layout',
				input: 'toggle',
				layout: 'stack',
				items: [
					{id: 'stack', label: 'stack'},
					{id: 'switcher', label: 'switcher'},
				],
			},
		],
	},
}

export const layouts: ApiOptions = {
	context: {
		name: 'Context',
		items: [
			{
				name: 'Container',
				input: 'toggle',
				layout: 'switcher',
				items: [
					{id: 'center', label: 'center'},
					{id: 'text', label: 'text'},
					{
						id: 'sidebar',
						label: 'sidebar',
						// items: [
						// 	{
						// 		input: 'radio',
						// 		layout: 'switcher',
						// 		items: [
						// 			{id: 'main', label: 'main'},
						// 			{id: 'side', label: 'side'},
						// 		],
						// 	},
						// ],
					},
				],
			},
			{
				name: 'Content',
				input: 'toggle',
				layout: 'switcher',
				items: [
					{id: 'card', label: 'card'},
					{id: 'form', label: 'form'},
					{id: 'text', label: 'text'},
				],
			},
			{
				name: 'Breakpoint',
				input: 'toggle',
				layout: 'switcher',
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
}

export const shared: ApiOptions = {
	size: {
		name: 'Size',
		items: [
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
		],
	},
}

export const API_OPTIONS: {[family: string]: ApiOptions} = {app, shared, blocks, layouts}

export const DEFAULT_OPTIONS: {
	[family: string]: {[option: string]: {[option: string]: string} | string}
} = {
	app: {settings: {brightness: 'day', contrast: 'low'}, theme: 'ui'},
	shared: {
		size: 'md',
	},
	blocks: {
		variant: '',
		layout: 'switcher',
		color: '',
		// app: 'ui', // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component context): maybe: use web components ?
		icon: '✨',
	},
	layouts: {
		context: {container: 'center', content: 'card', breakpoint: 'md'},
	},
}
