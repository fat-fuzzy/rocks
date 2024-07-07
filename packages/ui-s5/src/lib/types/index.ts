import type {Snippet} from 'svelte'

export type InputType =
	| 'text'
	| 'number'
	| 'range'
	| 'radio'
	| 'checkbox'
	| 'file'
	| 'email'
	| 'submit'

export type UiDimensions = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonContext = {
	id: string
	name: string
	value: string | number
}

export enum UiState {
	active = 'active',
	inactive = 'inactive',
	expanded = 'expanded',
	collapsed = 'collapsed',
}

export enum UiStatus {
	default = 'default',
	info = 'info',
	success = 'success',
	warning = 'warning',
	error = 'error',
}

export enum UiTextContext {
	form = 'form',
	prose = 'prose',
	code = 'code',
}

export type AriaLive = 'polite' | 'off' | 'assertive' | null | undefined

export type Settings = {
	[key: string]: string
}

export type InputPayload = {
	id: string
	name: string
	value?: string | number
}

export type UiLayoutProps = {
	/**
	 * Layout props
	 */
	align?: string
	justify?: string
	size?: string
	font?: string

	container?: string
	direction?: string
	place?: string
	position?: string
	dimensions?: string
	layout?: string
	threshold?: string
	breakpoint?: string
}

export type UiBlockProps = UiLayoutProps & {
	/**
	 * Block props
	 */
	asset?: string // the `value` part of  emoji:value or svg:value
	color?: string
	shape?: string
	variant?: string
	background?: string
	height?: string
	layer?: string
}

export type UiContentProps = {
	/**
	 * Content props
	 */
	id?: string
	title?: string
	children?: Snippet
}

export type SwitchState = {
	id: string
	value: string
	pressed: boolean
	name: string
	send: (event: string) => unknown
}

export type Tab = {
	id: string
	name: string
	title: string
	value: string
	initial?: string
	size?: string
	color?: string
	asset?: string
}
