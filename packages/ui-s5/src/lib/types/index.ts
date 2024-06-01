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
}

export enum UiState {
	active = 'active',
	inactive = 'inactive',
	expanded = 'expanded',
	collapsed = 'collapsed',
}

export type AriaLive = 'polite' | 'off' | 'assertive' | null | undefined

export enum ButtonEventType {
	expand = 'expand',
	toggle = 'toggle',
	switch = 'switch',
}

export type Settings = {
	[key: string]: string
}

export type InputPayload = {
	id: string
	name: string
	value: string
}

export type UiLayoutProps = {
	/**
	 * Layout props
	 */
	align?: string
	size?: string

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
	asset?: string // emoji:value or svg:value
	color?: string
	shape?: string
	variant?: string
	background?: string
	height?: string
}

export type UiContentProps = {
	/**
	 * Content props
	 */
	id?: string
	title?: string
	children?: Snippet
}

export type ButtonState = {
	text: string
	value: string
	asset: string
	variant?: string
	onclick: (event: MouseEvent, payload: any) => void
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
	title: string
	value?: string
	initial?: string
	size?: string
	color?: string
	asset?: string
}
