import type {UiStatus, UiBlockProps} from '$types'

function getBlockStyles(props: UiBlockProps): string {
	const {
		color,
		size,
		font,
		shape,
		align,
		alignSelf,
		justify,
		asset,
		assetType,
		variant,
		background,
	} = props

	const classes = []
	/* Block styles */
	const colorClass = color ? `color:${color}` : '' // TODO: clarify bg/color/surface
	const backgroundClass = background
		? `bg:${background}`
		: color
			? `bg:${color}`
			: ''
	const sizeClass = size ? `size:${size}` : ''
	const fontClass = font ? `font:${font}` : size ? `font:${size}` : ''
	const assetTypeClass = assetType ? assetType : 'emoji'
	const assetClass = asset ? `${assetTypeClass}:${asset}` : ''
	const variantClass = variant ? `variant:${variant}` : ''
	const shapeClass = shape ? `shape:${shape}` : ''
	const alignClass = alignSelf ? `align-self:${alignSelf}` : ''
	const alignSelfClass = align ? `align:${align}` : ''
	const justifyClass = justify
		? `justify:${justify}`
		: shapeClass
			? 'justify:center'
			: ''

	if (colorClass) classes.push(colorClass)
	if (backgroundClass) classes.push(backgroundClass)
	if (sizeClass) classes.push(sizeClass)
	if (fontClass) classes.push(fontClass)
	if (assetClass) classes.push(assetClass)
	if (variantClass) classes.push(variantClass)
	if (shapeClass) classes.push(shapeClass)
	if (alignClass) classes.push(alignClass)
	if (alignSelfClass) classes.push(alignSelfClass)
	if (justifyClass) classes.push(justifyClass)

	return classes.join(' ').trim()
}

/**
 * Context styles
 */
function getContainerStyles(props: UiBlockProps): string {
	const {size, container, dimensions, layer} = props

	const classes = []
	const containerClass =
		container === 'ravioli' ? container : container ? `l:${container}` : ''
	const layerClass = layer ? `layer:${layer}` : ''
	if (layerClass) classes.push(layerClass)

	if (containerClass) {
		const dimensionsClass = dimensions ? `${containerClass}:${dimensions}` : ''
		const sizeClass =
			!dimensions && size
				? `${containerClass}:${size}`
				: `${dimensionsClass} size:${size}`

		if (!sizeClass && dimensionsClass) classes.push(dimensionsClass)
		if (sizeClass) classes.push(sizeClass)
		if (!dimensions && !size) classes.push(containerClass)
	}

	return classes.join(' ').trim()
}

function getLayoutStyles(props: UiBlockProps): string {
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
	const thresholdClass = threshold ? `th:${threshold}` : ''
	const shapeClass = shape ? `shape:${shape}` : ''
	const breakpointClass = breakpoint ? `bp:${breakpoint}` : ''
	let layoutClass = layout && shape && shape !== 'pill' ? 'stack' : layout
	const scrollClass = scroll ? `scroll:${scroll}` : ''
	const heightClass = height ? `h:${height}` : ''
	const layerClass = layer ? `layer:${layer}` : ''
	const positionClass = position ? position : ''
	const backgroundClass = background ? `bg:${background}` : ''
	const sizeClass = size ? `size:${size}` : ''

	if (layoutClass) {
		layoutClass =
			layout && size
				? `l:${layoutClass}:${size}`
				: sizeClass
					? `l:${layoutClass} ${sizeClass}`
					: `l:${layoutClass}`
	}

	if (layoutClass) classes.push(layoutClass)
	if (shapeClass) classes.push(shapeClass)
	if (thresholdClass) classes.push(thresholdClass)
	if (breakpointClass) classes.push(breakpointClass)
	if (scrollClass) classes.push(scrollClass)
	if (heightClass) classes.push(heightClass)
	if (layerClass) classes.push(layerClass)
	if (positionClass) classes.push(positionClass)
	if (backgroundClass) classes.push(backgroundClass)

	return classes.join(' ').trim()
}

function getFeedbackStyles(
	props: UiBlockProps,
	status: UiStatus,
	context: string,
): string {
	const {
		size,
		font,
		asset,
		assetType,
		variant,
		shape,
		align,
		justify,
		layer,
		container,
	} = props

	const classes = []
	const variantClass = variant ? `variant:${variant}` : ''
	const sizeClass = size ? `size:${size}` : ''
	const fontClass = font ? `font:${font}` : ''
	const shapeClass = shape ? `shape:${shape}` : ''

	let layoutClass = ''
	let alignClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''

	if (shape === 'round' || shape === 'square') {
		layoutClass = `l:stack${size}`
		alignClass = 'align:center'
		justifyClass = 'justify:center'
	}

	if (shape === 'pill') {
		alignClass = 'align:center'
		justifyClass = 'justify:center'
	}

	const statusClass = status ? `status:${status}` : ''
	const assetTypeClass = asset === 'none' ? '' : assetType ? assetType : 'emoji'
	const assetClass = status
		? `${assetTypeClass}:${status}`
		: asset
			? `${assetTypeClass}:${asset}`
			: ''
	const typeClass = context ? `feedback:${context}` : 'feedback'
	const backgroundClass = context === 'code' ? '' : `bg:${status}:100`
	const layerClass = layer ? `layer:${layer}` : ''
	const containerClass =
		container && context !== 'code' ? `l:${container}:${size}` : ''

	if (typeClass) classes.push(typeClass)
	if (statusClass) classes.push(statusClass)
	if (assetClass) classes.push(assetClass)
	if (sizeClass) classes.push(sizeClass)
	if (fontClass) classes.push(fontClass)
	if (layerClass) classes.push(layerClass)
	if (shapeClass) classes.push(shapeClass)
	if (layoutClass) classes.push(layoutClass)
	if (variantClass) classes.push(variantClass)
	if (alignClass) classes.push(alignClass)
	if (justifyClass) classes.push(justifyClass)
	if (layerClass) classes.push(layerClass)
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

	const elementClasses = getBlockStyles({
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

	const classes = `${containerClasses} ${layoutClasses} ${elementClasses}`

	return classes.trim()
}

export default {
	getStyles,
	getContainerStyles,
	getLayoutStyles,
	getBlockStyles,
	getFeedbackStyles,
}
