const UiState = Object.freeze({
	__proto__: null,
	active: 'active',
	inactive: 'inactive',
	expanded: 'expanded',
	collapsed: 'collapsed',
	hovering: 'hovering',
	dropped: 'dropped',
	over: 'over',
})

const UiStatus = Object.freeze({
	__proto__: null,
	default: 'default',
	info: 'info',
	success: 'success',
	warning: 'warning',
	error: 'error',
})

const UiTextContext = Object.freeze({
	__proto__: null,
	form: 'form',
	prose: 'prose',
	code: 'code',
})

const UiSize = Object.freeze({
	__proto__: null,
	'2xs': '2xs',
	xs: 'xs',
	sm: 'sm',
	md: 'md',
	lg: 'lg',
	xl: 'xl',
	'2xl': '2xl',
})

const UiColor = Object.freeze({
	__proto__: null,
	primary: 'primary',
	accent: 'accent',
	highlight: 'highlight',
	neutral: 'neutral',
})

const UiAssetType = Object.freeze({
	__proto__: null,
	emoji: 'emoji',
	svg: 'svg',
	none: 'none',
})

const UiVariant = Object.freeze({
	__proto__: null,
	fill: 'fill',
	outline: 'outline',
	bare: 'bare',
})

const UiShape = Object.freeze({
	__proto__: null,
	round: 'round',
	square: 'square',
	pill: 'pill',
	soft: 'soft',
	mellow: 'mellow',
	none: 'none',
})

const UiDimension = Object.freeze({
	__proto__: null,
	video: 'video',
	twin: 'twin',
	square: 'square',
})

const style_props = {
	UiState,
	UiStatus,
	UiTextContext,
	UiSize,
	UiColor,
	UiAssetType,
	UiVariant,
	UiShape,
	UiDimension,
}

export default style_props
