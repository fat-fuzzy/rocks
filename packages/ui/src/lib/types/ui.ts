import type {Snippet} from 'svelte'
import type {
	UiContainer,
	UiLayout,
	UiColor,
	UiShape,
	UiVariant,
	UiSize,
	UiDimension,
} from '$types'

export type ButtonContext = {
	id: string
	name: string
	value: string | number
}

export type AriaLive = 'polite' | 'off' | 'assertive' | null | undefined

export type Autocomplete = AutoFill | null | undefined

export type UiRevealState = {
	reveal: string
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
	size?: UiSize
	font?: UiSize
	theme?: UiColor
	shape?: UiShape
	height?: string
	background?: string

	scroll?: string
	container?: UiContainer
	direction?: string
	place?: string
	position?: string
	dimensions?: UiDimension
	layer?: string
	layout?: UiLayout
	threshold?: UiSize
	breakpoint?: UiSize
}

export type UiBlockProps = UiLayoutProps & {
	/**
	 * Block props
	 */
	asset?: string // the `value` part of emoji:value or svg:value
	assetType?: string // the `svg` or `emoji` part of emoji:value or svg:value
	color?: UiColor
	font?: string
	variant?: UiVariant
	width?: string
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
