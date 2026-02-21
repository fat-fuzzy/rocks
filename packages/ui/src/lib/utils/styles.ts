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
	width: 'width',
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
	if (prop === undefined || prop === 'none') {
		return ''
	}

	const base = STYLE_BASE_CLASS[propName]
	return appendModifier(base, prop)
}

function getContainerStyles(props: UiContainerProps): string {
	const {container, dimensions, layer, size, containerSize} = props

	const classes = []

	const containerClass = container?.startsWith('ravioli')
		? container
		: getClass('container', container)

	const layerClass = getClass('layer', layer)
	if (layerClass) classes.push(layerClass)

	if (containerClass) {
		const dimensionsClass = appendModifier(containerClass, dimensions)
		const localSize = containerSize ?? size
		const sizeClass =
			!dimensions && localSize
				? appendModifier(containerClass, localSize)
				: localSize
					? `${dimensionsClass} size:${localSize}`
					: ''

		if (!sizeClass && dimensionsClass) classes.push(dimensionsClass)
		if (sizeClass) classes.push(sizeClass)
		if (!dimensions && !size) classes.push(containerClass)
	}

	return classes.join(' ').trim()
}

function getLayoutStyles(props: UiLayoutProps): string {
	const {
		align,
		alignSelf,
		justify,
		size,
		height,
		width,
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
	const widthClass = getClass('width', width)
	const heightClass = getClass('height', height)
	const layerClass = getClass('layer', layer)
	const backgroundClass = getClass('background', background)
	const positionClass = position ? position : ''

	const layoutBase =
		shape === 'round' || shape === 'square' ? 'stack' : (layout as string)

	if (layoutBase) {
		// TODO: fix this later
		// if (layoutBase === 'switcher' && !thresholdClass) {
		// 	console.warn(
		// 		'Switcher layout will not wrap without a threshold and no threshold is provided',
		// 	)
		// }

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

	const alignSelfClass = getClass('alignSelf', alignSelf)

	const alignBase = shape === 'round' || shape === 'square' ? 'center' : align
	const alignClass = getClass('align', alignBase)
	const justifyBase =
		shape === 'round' || shape === 'square' ? 'center' : justify

	const justifyClass = getClass('justify', justifyBase)

	if (alignClass) classes.push(alignClass)
	if (alignSelfClass) classes.push(alignSelfClass)
	if (backgroundClass) classes.push(backgroundClass)
	if (breakpointClass) classes.push(breakpointClass)
	if (widthClass) classes.push(widthClass)
	if (heightClass) classes.push(heightClass)
	if (justifyClass) classes.push(justifyClass)
	if (layerClass) classes.push(layerClass)
	if (positionClass) classes.push(positionClass)
	if (scrollClass) classes.push(scrollClass)
	if (shapeClass) classes.push(shapeClass)

	return classes.join(' ').trim()
}

function getBlockStyles(props: UiBlockProps): string {
	const {asset, assetType, background, color, font, size, variant} = props

	const classes = []

	const colorClass = getClass('color', color) // TODO: clarify bg/color/surface
	if (!background && color) {
		const backgroundClass = getClass('background', color)
		classes.push(backgroundClass)
	}

	const fontBase = font ? font : size
	const fontClass = getClass('font', fontBase)

	const sizeClass = getClass('size', size)

	if (asset && asset !== 'none') {
		const assetTypeClass = assetType ? assetType : 'emoji'
		const assetClass = appendModifier(assetTypeClass, asset)
		classes.push(assetClass)
	}

	const variantClass = getClass('variant', variant)

	if (colorClass) classes.push(colorClass)
	if (fontClass) classes.push(fontClass)
	if (sizeClass) classes.push(sizeClass)
	if (variantClass) classes.push(variantClass)

	return classes.join(' ').trim()
}

function getFeedbackStyles(
	props: UiBlockProps,
	status: UiStatus,
	context: string,
): string {
	const {asset, assetType, container, font, size, containerSize, variant} =
		props

	const layoutStyles = getLayoutStyles(props)
	const blockStyles = getBlockStyles({
		font,
		asset,
		assetType,
		variant,
	})

	const classes = [layoutStyles, blockStyles]

	const statusClass = getClass('status', status)
	classes.push(statusClass)

	if (asset !== 'none') {
		const defaultAssetType = assetType ?? 'emoji'
		const defaultAssetClass = appendModifier(defaultAssetType, status)
		classes.push(defaultAssetClass)
	}

	const typeClass = `feedback:${context}`
	classes.push(typeClass)

	const backgroundClass = context === 'code' ? undefined : `bg:${status}:100`
	const containerBase = container?.startsWith('ravioli')
		? container
		: getClass('container', container)

	const localSize = containerSize ?? size
	const containerClass =
		container && context !== 'code' && container !== 'raviolink'
			? appendModifier(containerBase, localSize)
			: containerBase

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
		width,
		height,
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
		asset,
		assetType,
		variant,
	})

	const layoutClasses = getLayoutStyles({
		align,
		justify,
		width,
		height,
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
