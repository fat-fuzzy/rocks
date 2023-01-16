import type {ComponentType} from 'svelte'
export type UIChildren = string | ComponentType | (string | ComponentType)[]
export type UIProps = {
	icon?: string
	size?: string
	theme?: string
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
	[key: string]: {
		name: string
		input: string
		items: Array<{id: string; label: string; asset?: string | SVGElement}>
	}
}

export const options: UIPropOptions = {
	variant: {
		name: 'Variant',
		input: 'toggle',
		items: [
			{id: 'full', label: 'full'},
			{id: 'outline', label: 'outline'},
			{id: 'bare', label: 'bare'},
		],
	},
	size: {
		name: 'Size',
		input: 'radio',
		items: [
			{id: 'xs', label: 'xs'},
			{id: 'sm', label: 'sm'},
			{id: 'md', label: 'md'},
			{id: 'lg', label: 'lg'},
			{id: 'xl', label: 'xl'},
		],
	},
	color: {
		name: 'Color',
		input: 'radio',
		items: [
			{id: 'primary', label: 'primary'},
			{id: 'accent', label: 'accent'},
			{id: 'highlight', label: 'highlight'},
		],
	},
	theme: {
		name: 'Theme',
		input: 'radio',
		items: [
			{id: 'light', label: 'light'},
			{id: 'dark', label: 'dark'},
		],
	},
	layout: {
		name: 'Layout',
		input: 'radio',
		items: [
			{id: 'stack', label: 'stack'},
			{id: 'switcher', label: 'switcher'},
		],
	},
	app: {
		name: 'App',
		input: 'radio',
		items: [
			{id: 'doc', label: 'doc'},
			{id: 'client', label: 'client'},
			{id: 'ui', label: 'ui'},
		],
	},
	icon: {
		name: 'Icon',
		input: 'datalist',
		items: [
			{id: 'idea', label: 'idea', asset: '💡'},
			{id: 'user', label: 'user', asset: '🦁'},
			{id: 'favorite', label: 'favorite', asset: '❤️'},
		],
	},
}
