import type {ComponentType} from 'svelte'
export type UIChildren = string | ComponentType | (string | ComponentType)[]
export type UIProps = {
	icon?: string
	size?: string
	light?: string
	contrast?: string
	variant?: string
	color?: string
	layout?: string
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

export type UIPropOptions = {
	name: string
	input: string
	layout?: string
	items: Array<{id: string; label: string; asset?: string | SVGElement}>
}
export type StoryOptions = {
	[key: string]: {
		name: string
		layout?: string
		exclude?: string[]
		items: UIPropOptions[]
	}
}

export const options: StoryOptions = {
	theme: {
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
	variant: {
		name: 'Variant',
		exclude: ['Nav', 'Burrito', 'Sidebar', 'Stack'],
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
	color: {
		name: 'Color',
		exclude: ['Burrito', 'Sidebar', 'Stack'],
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
	layout: {
		name: 'Layout',
		exclude: ['Button', 'Toggle', 'Burrito', 'Sidebar', 'Stack'],
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

	// TODO: figure out how to load app styles (i.e. load CSS with prefix, encapsulate component context): maybe: use web components ?
	// app: {
	// 	name: 'App',
	// 	input: 'radio',
	// 	items: [
	// 		{id: 'doc', label: 'doc'},
	// 		{id: 'client', label: 'client'},
	// 		{id: 'ui', label: 'ui'},
	// 	],
	// },
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
}
