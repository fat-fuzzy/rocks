import type {Snippet} from 'svelte'
import type {
	UiContainer,
	UiLayout,
	UiColor,
	UiSurface,
	UiShape,
	UiVariant,
	UiSize,
	UiDimension,
	UiAssetType,
} from '$types'

export type AriaLive = 'polite' | 'off' | 'assertive' | null | undefined

export type AutoComplete = AutoFill | null | undefined

export type InputPayload = {
	id: string
	name: string
	value?: string | number
}

export type UiContainerProps = {
	container?: UiContainer
	containerSize?: UiSize
	dimensions?: UiDimension // TODO: check / harmonize STYLE_MODIFIER
	layer?: string
	size?: UiSize
	hug?: boolean
}

export type UiLayoutProps = UiContainerProps & {
	align?: string
	alignSelf?: string
	background?: UiSurface
	surface?: UiSurface
	surfaceLightness?: number
	breakpoint?: UiSize
	direction?: string // TODO: check / harmonize STYLE_MODIFIER
	font?: UiSize
	height?: string // TODO: check / harmonize (height/width classes)
	width?: string
	justify?: string
	reverse?: string
	layout?: UiLayout
	place?: string // TODO: check / harmonize STYLE_MODIFIER
	fixed?: string
	position?: string // TODO: check / harmonize STYLE_MODIFIER
	scroll?: string
	shape?: UiShape
	theme?: UiColor // TODO: check / harmonize
	threshold?: UiSize
}

export type UiBlockProps = UiLayoutProps & {
	asset?: string // the `value` part of emoji:value or svg:value
	assetType?: UiAssetType // the `svg` or `emoji` part of emoji:value or svg:value  TODO: check / harmonize STYLE_MODIFIER
	color?: UiColor
	font?: string
	text?: string
	variant?: UiVariant
	width?: string // TODO: check / harmonize  STYLE_MODIFIER + (height/width classes)
}

export type UiContentProps = {
	children?: Snippet
	id?: string
	title?: string
}

export type UiControl = {
	slug: string
	label: string
	title?: string
	asset?: string
	assetType?: UiAssetType
	color?: UiColor
	size?: UiSize
	variant?: UiVariant
	shape?: UiShape
	layout?: UiLayout
	actionPath?: string
	preload?: string
	items?: UiControl[]
}

export type UiAnimationEvent = MouseEvent | TouchEvent
