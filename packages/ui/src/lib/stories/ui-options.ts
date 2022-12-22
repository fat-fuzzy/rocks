import type {ComponentType} from 'svelte'
export type UIChildren = string | ComponentType | (string | ComponentType)[]
export type UIProps = {
	icon?: string
	size?: string
	theme?: string
	variant?: string
	layout?: string
} & {
	[handler: string]: (event: Event) => unknown
}
export type UIPropOptions = {
	theme?: {input: string; items: Array<{id: string; value: string}>}
	icon?: {input: string; items: Array<{id: string; value: string; asset: SVGElement}>}
	size?: {input: string; items: Array<{id: string; value: string}>}
	variant?: {input: string; items: Array<{id: string; value: string}>}
	color?: {input: string; items: Array<{id: string; value: string}>}
	layout?: {input: string; items: Array<{id: string; value: string}>}
	action?: {input: string; items: Array<{id: string; value: string}>}
}

export const options: UIPropOptions = {
	icon: {
		input: 'datalist',
		items: [],
	},
	size: {
		input: 'radio',
		items: [
			{id: 'xs', value: 'xs'},
			{id: 'sm', value: 'sm'},
			{id: 'md', value: 'md'},
			{id: 'lg', value: 'lg'},
			{id: 'xl', value: 'xl'},
		],
	},
	variant: {
		input: 'radio',
		items: [
			{id: 'outline', value: 'outline'},
			{id: 'primary', value: 'primary'},
		],
	},
	color: {
		input: 'radio',
		items: [
			{id: 'primary', value: 'primary'},
			{id: 'accent', value: 'accent'},
			{id: 'highlight', value: 'highlight'},
		],
	},
	theme: {
		input: 'radio',
		items: [
			{id: 'light', value: 'light'},
			{id: 'dark', value: 'dark'},
		],
	},
	layout: {
		input: 'radio',
		items: [
			{id: 'stack', value: 'stack'},
			{id: 'switcher', value: 'switcher'},
		],
	},
}
