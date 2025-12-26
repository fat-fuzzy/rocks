import type {
	UiStatus,
	UiContainerProps,
	UiLayoutProps,
	UiBlockProps,
} from '$types'

const STYLE_BASE_CLASS: Record<string, string> = {
	align: 'align',
	alignSelf: 'align-self',
	background: 'bg',
	breakpoint: 'bp',
	color: 'color',
	container: 'l', // TODO: use `c:` prefix
	font: 'font',
	justify: 'justify',
	height: 'h',
	layer: 'layer',
	layout: 'l',
	size: 'size',
	scroll: 'scroll',
	shape: 'shape',
	status: 'status',
	theme: 'color', // TODO: check / harmonize
	threshold: 'th',
	variant: 'variant',
}

// eslint-disable-next-line
const STYLE_MODIFIER: Record<string, string> = {
	asset: 'asset',
	assetType: 'assetType',
	dimensions: 'dimensions',
	direction: 'direction',
	place: 'place',
	position: 'position',
	width: 'width',
}

function appendModifier(base: string, modifier: string | undefined): string {
	if (modifier === undefined) {
		return ''
	}

	return `${base}:${modifier}`
}

function getClass(propName: string, prop: string | undefined): string {
	if (prop === undefined) {
		return ''
	}

	const base = STYLE_BASE_CLASS[propName]
	return appendModifier(base, prop)
}

function getContainerStyles(props: UiContainerProps): string {
	const {size, container, dimensions, layer} = props

	const classes = []
	const containerClass =
		container === 'ravioli' ? container : getClass('container', container)
	const layerClass = getClass('layer', layer)
	if (layerClass) classes.push(layerClass)

	if (containerClass) {
		const dimensionsClass = appendModifier(containerClass, dimensions)
		const sizeClass =
			!dimensions && size
				? appendModifier(containerClass, size)
				: `${dimensionsClass} size:${size}`

		if (!sizeClass && dimensionsClass) classes.push(dimensionsClass)
		if (sizeClass) classes.push(sizeClass)
		if (!dimensions && !size) classes.push(containerClass)
	}

	return classes.join(' ').trim()
}

function getLayoutStyles(props: UiLayoutProps): string {
	const {
		size,
		height,
		shape,
		layout,
		scroll,
		position,
		threshold,
		breakpoint,
		layer,
		background,
	} = props

	const classes = []
	const thresholdClass = getClass('threshold', threshold)
	const shapeClass = getClass('shape', shape)
	const breakpointClass = getClass('breakpoint', breakpoint)
	const scrollClass = getClass('scroll', scroll)
	const heightClass = getClass('height', height)
	const layerClass = getClass('layer', layer)
	const backgroundClass = getClass('background', background)
	const positionClass = position ? position : ''

	const layoutBase =
		layout && shape && (shape === 'round' || shape === 'square')
			? 'stack'
			: (layout as string)

	if (layoutBase) {
		if (layoutBase === 'switcher' && !thresholdClass) {
			throw Error('Layout switcher must declare a threshold')
		}

		let layoutClass = getClass('layout', layoutBase)
		if (size) layoutClass = appendModifier(layoutClass, size)

		classes.push(layoutClass)
		if (layoutBase === 'switcher') {
			classes.push(thresholdClass)
		}
	} else {
		const sizeClass = getClass('size', size)
		if (sizeClass) classes.push(sizeClass)
	}

	if (shapeClass) classes.push(shapeClass)
	if (breakpointClass) classes.push(breakpointClass)
	if (scrollClass) classes.push(scrollClass)
	if (heightClass) classes.push(heightClass)
	if (layerClass) classes.push(layerClass)
	if (positionClass) classes.push(positionClass)
	if (backgroundClass) classes.push(backgroundClass)

	return classes.join(' ').trim()
}

function getBlockStyles(props: UiBlockProps): string {
	const {
		align,
		alignSelf,
		asset,
		assetType,
		color,
		font,
		justify,
		shape,
		size,
		variant,
	} = props

	const layoutStyles = getLayoutStyles(props)
	const classes = [layoutStyles]
	const colorClass = getClass('color', color) // TODO: clarify bg/color/surface

	const fontBase = font ? font : size
	const fontClass = getClass('font', fontBase)

	const assetTypeClass = assetType ? assetType : 'emoji'
	const assetClass = appendModifier(assetTypeClass, asset)
	const variantClass = getClass('variant', variant)
	const alignSelfClass = getClass('alignSelf', alignSelf)

	const alignBase = align
		? align
		: shape === 'round' || shape === 'square' || shape === 'pill'
			? 'center'
			: undefined
	const alignClass = getClass('align', alignBase)
	const justifyBase = justify
		? justify
		: shape === 'round' || shape === 'square' || shape === 'pill'
			? 'center'
			: undefined
	const justifyClass = getClass('justify', justifyBase)

	if (colorClass) classes.push(colorClass)
	if (fontClass) classes.push(fontClass)
	if (assetClass) classes.push(assetClass)
	if (variantClass) classes.push(variantClass)
	if (alignClass) classes.push(alignClass)
	if (alignSelfClass) classes.push(alignSelfClass)
	if (justifyClass) classes.push(justifyClass)

	return classes.join(' ').trim()
}

function getFeedbackStyles(
	props: UiBlockProps,
	status: UiStatus,
	context: string,
): string {
	const {align, asset, assetType, justify, container, font, variant, size} =
		props

	const layoutStyles = getLayoutStyles(props)
	const blockStyles = getBlockStyles({
		font,
		asset,
		assetType,
		variant,
		align,
		justify,
	})

	const classes = [layoutStyles, blockStyles]

	const statusClass = getClass('status', status)
	const assetTypeClass = asset === 'none' ? '' : assetType ? assetType : 'emoji'
	const assetClass = status
		? `${assetTypeClass}:${status}`
		: asset
			? `${assetTypeClass}:${asset}`
			: ''
	const typeClass = context ? `feedback:${context}` : 'feedback'
	const backgroundClass = context === 'code' ? '' : `bg:${status}:100`
	const containerClass =
		container && context !== 'code' ? `l:${container}:${size}` : ''

	if (typeClass) classes.push(typeClass)
	if (statusClass) classes.push(statusClass)
	if (assetClass) classes.push(assetClass)
	if (backgroundClass) classes.push(backgroundClass)
	if (containerClass) classes.push(containerClass)

	return classes.join(' ').trim()
}

function getStyles(props: UiBlockProps): string {
	const {
		color,
		size,
		font,
		shape,
		align,
		justify,
		asset,
		assetType,
		variant,
		layout,
		scroll,
		container,
		dimensions,
		threshold,
		breakpoint,
		background,
	} = props

	const blockClasses = getBlockStyles({
		color,
		size,
		font,
		shape,
		align,
		justify,
		asset,
		assetType,
		variant,
	})

	const layoutClasses = getLayoutStyles({
		size,
		shape,
		layout,
		scroll,
		threshold,
		breakpoint,
		background,
	})

	const containerClasses = getContainerStyles({size, container, dimensions})

	const classes = `${containerClasses} ${layoutClasses} ${blockClasses}`

	return classes.trim()
}

export default {
	getStyles,
	getContainerStyles,
	getLayoutStyles,
	getBlockStyles,
	getFeedbackStyles,
}
