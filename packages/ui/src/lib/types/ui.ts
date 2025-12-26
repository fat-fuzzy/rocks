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

export type AriaLive = 'polite' | 'off' | 'assertive' | null | undefined

export type AutoComplete = AutoFill | null | undefined

export type UiRevealState = {
	reveal: string
}

export type InputPayload = {
	id: string
	name: string
	value?: string | number
}

export type UiContainerProps = {
	container?: UiContainer
	dimensions?: UiDimension // TODO: check / harmonize STYLE_MODIFIER
	layer?: string
	size?: UiSize
}

export type UiLayoutProps = UiContainerProps & {
	align?: string
	alignSelf?: string
	background?: string
	breakpoint?: UiSize
	direction?: string // TODO: check / harmonize STYLE_MODIFIER
	font?: UiSize
	height?: string // TODO: check / harmonize (height/width classes)
	justify?: string
	layout?: UiLayout
	place?: string // TODO: check / harmonize STYLE_MODIFIER
	position?: string // TODO: check / harmonize STYLE_MODIFIER
	scroll?: string
	shape?: UiShape
	theme?: UiColor // TODO: check / harmonize
	threshold?: UiSize
}

export type UiBlockProps = UiLayoutProps & {
	asset?: string // the `value` part of emoji:value or svg:value
	assetType?: string // the `svg` or `emoji` part of emoji:value or svg:value  TODO: check / harmonize STYLE_MODIFIER
	color?: UiColor
	font?: string
	variant?: UiVariant
	width?: string // TODO: check / harmonize  STYLE_MODIFIER + (height/width classes)
}

export type UiContentProps = {
	children?: Snippet
	id?: string
	title?: string
}

export type UiAnimationEvent = MouseEvent | TouchEvent
