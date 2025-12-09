import type {UiStatus, UiBlockProps} from '$types'

function getBlockStyles(props: UiBlockProps): string {
	let {
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

	let classes = []
	/* Block styles */
	let colorClass = color ? `color:${color}` : '' // TODO: clarify bg/color/surface
	let backgroundClass = background
		? `bg:${background}`
		: color
			? `bg:${color}`
			: ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = font ? `font:${font}` : size ? `font:${size}` : ''
	let assetTypeClass = assetType ? assetType : 'emoji'
	let assetClass = asset ? `${assetTypeClass}:${asset}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let shapeClass = shape ? `shape:${shape}` : ''
	let alignClass = alignSelf ? `align-self:${alignSelf}` : ''
	let alignSelfClass = align ? `align:${align}` : ''
	let justifyClass = justify
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
	let {size, container, dimensions, layer} = props

	let classes = []
	let containerClass =
		container === 'ravioli' ? container : container ? `l:${container}` : ''
	let layerClass = layer ? `layer:${layer}` : ''

	if (containerClass) {
		let dimensionsClass = dimensions ? `${containerClass}:${dimensions}` : ''
		let sizeClass =
			!dimensions && size ? `${containerClass}:${size}` : `size:${size}`

		if (dimensionsClass) classes.push(dimensionsClass)
		if (sizeClass) classes.push(sizeClass)
	}

	if (containerClass && !dimensions && !size) classes.push(containerClass)
	if (layerClass) classes.push(layerClass)

	return classes.join(' ').trim()
}

function getLayoutStyles(props: UiBlockProps): string {
	let {
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

	let classes = []
	let thresholdClass = threshold ? `th:${threshold}` : ''
	let shapeClass = shape ? `shape:${shape}` : ''
	let breakpointClass = breakpoint ? `bp:${breakpoint}` : ''
	let layoutClass = layout && shape && shape !== 'pill' ? 'stack' : layout
	let scrollClass = scroll ? `scroll:${scroll}` : ''
	let heightClass = height ? `h:${height}` : ''
	let layerClass = layer ? `layer:${layer}` : ''
	let positionClass = position ? position : ''
	let backgroundClass = background ? `bg:${background}` : ''
	let sizeClass = size ? `size:${size}` : ''

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
	let {
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

	let classes = []
	let variantClass = variant ? `variant:${variant}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = font ? `font:${font}` : ''
	let shapeClass = shape ? `shape:${shape}` : ''

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

	let statusClass = status ? `status:${status}` : ''
	let assetTypeClass = asset === 'none' ? '' : assetType ? assetType : 'emoji'
	let assetClass = status
		? `${assetTypeClass}:${status}`
		: asset
			? `${assetTypeClass}:${asset}`
			: ''
	let typeClass = context ? `feedback:${context}` : 'feedback'
	let backgroundClass = context === 'code' ? '' : `bg:${status}:100`
	let layerClass = layer ? `layer:${layer}` : ''
	let containerClass =
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
	let {
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

	let elementClasses = getBlockStyles({
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

	let layoutClasses = getLayoutStyles({
		size,
		shape,
		layout,
		scroll,
		threshold,
		breakpoint,
		background,
	})

	let containerClasses = getContainerStyles({size, container, dimensions})

	let classes = `${containerClasses} ${layoutClasses} ${elementClasses}`

	return classes.trim()
}

export default {
	getStyles,
	getContainerStyles,
	getLayoutStyles,
	getBlockStyles,
	getFeedbackStyles,
}
