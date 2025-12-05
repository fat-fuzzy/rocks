import type {Snippet} from 'svelte'
import {AriaLiveEnum, Preferences} from '$types'
import type {UiState} from '$types'

export type ButtonContext = {
	id: string
	name: string
	value: string | number
}

export type AriaLive =
	| typeof AriaLiveEnum.polite
	| typeof AriaLiveEnum.off
	| typeof AriaLiveEnum.assertive
	| null
	| undefined

export type Autocomplete = AutoFill | null | undefined

export type Settings = typeof Preferences

export type UiRevealState = {
	reveal: typeof UiState
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
	alignSelf?: string
	justify?: string
	size?: string
	font?: string
	theme?: string

	scroll?: string
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
	asset?: string // the `value` part of emoji:value or svg:value
	assetType?: string // the `svg` or `emoji` part of emoji:value or svg:value
	color?: string
	font?: string
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

export type UiAnimationEvent = MouseEvent | TouchEvent
