import type {ComponentType} from 'svelte'
export type ComponentChild = string | ComponentType | (string | ComponentType)[]
export enum StyleEnum {
	icon = 'icon',
	size = 'size',
	light = 'light',
	contrast = 'contrast',
	variant = 'variant',
	color = 'color',
	layout = 'layout',
}
export type ComponentProps = {
	icon?: string
	size?: string
	light?: string
	contrast?: string
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
	container: StyleFamily
	content: StyleFamily
}

export const app: ApiOptions = {
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
	settings: {
		name: 'Theme',
		items: [
			{
				name: 'Light',
				input: 'toggle',
				layout: 'switcher',
				items: [
					{id: 'day', label: 'day'},
					{id: 'night', label: 'night'},
				],
			},
			{
				name: 'Contrast',
				input: 'toggle',
				layout: 'switcher',
				items: [
					{id: 'contrast', label: 'high'}, // TODO : fix color vars & classes
					{id: 'blend', label: 'low'},
					// {id: 'polar', label: 'polar'},
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
		layout: 'switcher',
		exclude: ['Button', 'Toggle'],
		items: [
			{
				name: 'Layout',
				input: 'toggle',
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
					{id: 'main', label: 'main'},
					{id: 'side', label: 'side'},
				],
			},
			{
				name: 'Content',
				input: 'toggle',
				items: [
					{id: 'stack', label: 'stack'},
					{id: 'switcher', label: 'switcher'},
					{id: 'text', label: 'text'},
				],
			},
			{
				name: 'Breakpoint',
				input: 'radio',
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

export const shared: ApiOptions = {
	size: {
		name: 'Size',
		items: [
			{
				name: 'Size',
				input: 'toggle',
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

export const DEFAULT_OPTIONS = {
	app: {light: 'day', contrast: 'low', app: 'ui'},
	blocks: {
		variant: '',
		color: '',
		layout: 'switcher',
		// app: 'ui', // TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component context): maybe: use web components ?
		icon: '✨',
	},
	layouts: {
		container: '',
		content: '',
	},
	shared: {
		size: 'md',
	},
}
