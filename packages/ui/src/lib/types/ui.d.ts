import type {Snippet} from 'svelte'
import {
	AriaLiveEnum,
	UiSettings,
	UiSize,
	UiDimensions,
	UiShape,
	UiColor,
	UiVariant,
} from '$types'

export type ButtonContext = {
	id: string
	name: string
	value: string | number
}

export type AriaLive =
	| AriaLiveEnum.polite
	| AriaLiveEnum.off
	| AriaLiveEnum.assertive
	| null
	| undefined

export type Autocomplete = FullAutoFill | null | undefined

export type Settings = {
	[setting in UiSettings]?: string
}

export type UiRevealState = {
	reveal: UiState
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
	asset?: string // the `value` part of emoji:value or svg:value
	assetType?: string // the `svg` or `emoji` part of emoji:value or svg:value
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

export type Tab = UiBlockProps & {
	id: string
	name: string
	title: string
	value: string
	initial?: string
}
