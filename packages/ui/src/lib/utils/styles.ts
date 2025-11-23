import type {UiBlockProps} from '$types'
import {UiStatus, UiTextContext} from '$types'

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
	let shapeClass = shape ? ` shape:${shape}` : ''
	let alignClass = alignSelf ? `align-self:${alignSelf}` : ''
	let alignSelfClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''

	if (shapeClass) {
		justifyClass = 'justify:center'
	}
	let elementClasses = `${assetClass} ${colorClass} ${backgroundClass} ${sizeClass} ${shapeClass} ${variantClass} ${alignClass} ${alignSelfClass} ${justifyClass} ${fontClass}`

	return elementClasses.trim()
}

/**
 * Context styles
 */
function getContainerStyles(props: UiBlockProps): string {
	let {size, container, dimensions, layer} = props

	let containerClass =
		container === 'ravioli' ? container : container ? `l:${container} ` : ''
	let layerClass = layer ? ` layer:${layer}` : ''

	if (containerClass) {
		containerClass = dimensions
			? `${container}:${dimensions} ${layerClass}`
			: size
				? `${container}:${size} ${layerClass}`
				: ''
	}

	return containerClass.trim()
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

	let thresholdClass = threshold ? `th:${threshold}` : ''
	let breakpointClass = breakpoint ? `bp:${breakpoint}` : ''
	let layoutClass = layout && shape && shape !== 'pill' ? 'stack' : layout
	let scrollClass = scroll ? `scroll:${scroll}` : ''
	let heightClass = height ? ` h:${height}` : ''
	let layerClass = layer ? ` layer:${layer}` : ''
	let positionClass = position ? position : ''
	let backgroundClass = background ? `bg:${background}` : ''

	if (layoutClass) {
		layoutClass =
			layout && size
				? `l:${layoutClass}:${size}`
				: layout
					? `l:${layoutClass}`
					: ''
	}

	let layoutClasses = `${layoutClass} ${thresholdClass} ${breakpointClass} ${heightClass} ${backgroundClass} ${layerClass} ${positionClass} ${scrollClass}`

	return layoutClasses.trim()
}

function getFeedbackStyles(
	props: UiBlockProps,
	status: typeof UiStatus,
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
	let backgroundClass = context === UiTextContext.code ? '' : `bg:${status}:100`
	let layerClass = layer ? `layer:${layer}` : ''
	let containerClass =
		container && context !== UiTextContext.code ? `l:${container}:${size}` : ''

	let feedbackClasses = `${typeClass} ${statusClass} ${assetClass} ${sizeClass} ${fontClass} ${shapeClass} ${layoutClass} ${variantClass} ${alignClass} ${justifyClass} ${layerClass} ${backgroundClass} ${containerClass}`

	return feedbackClasses.trim()
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
