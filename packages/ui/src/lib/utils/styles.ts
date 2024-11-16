import type {UiBlockProps, UiTextContext} from '$types'
import {UiStatus} from '$types'

function getElementStyles(props: UiBlockProps): string {
	let {
		color,
		size,
		shape,
		align,
		justify,
		asset,
		assetType,
		variant,
		background,
	} = props

	/* Element styles */
	let colorClass = color ? `color:${color}` : '' // TODO: clarify bg/color/surface
	let backgroundClass = color ? `bg:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = size ? `font:${size}` : ''
	let assetTypeClass = assetType ? assetType : 'emoji'
	let assetClass = asset ? `${assetTypeClass}:${asset}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let shapeClass = shape ? ` shape:${shape}` : ''
	let alignClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''

	if (shapeClass) {
		justifyClass = 'justify:center'
	}
	let elementClasses = `${assetClass} ${colorClass} ${backgroundClass} ${sizeClass} ${shapeClass} ${variantClass} ${alignClass} ${justifyClass} ${fontClass}`

	return elementClasses.trim()
}

/**
 * Context styles
 */
function getContainerStyles(props: UiBlockProps): string {
	let {size, container, dimensions, layer} = props

	let containerClass = container ? `l:${container} ` : ''
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
		position,
		threshold,
		breakpoint,
		layer,
		background,
	} = props

	let thresholdClass = threshold ? `th:${threshold}` : ''
	let breakpointClass = breakpoint ? `bp:${breakpoint}` : ''
	let layoutClass = layout && shape ? 'stack' : layout
	let heightClass = height ? ` h:${height}` : ''
	let layerClass = layer ? ` layer:${layer}` : ''
	let positionClass = position ? position : ''
	let backgroundClass = background ? `bg:${background}` : ''

	if (layoutClass) {
		layoutClass = size ? `l:${layoutClass}:${size}` : `l:${layoutClass}`
	}

	let layoutClasses = `${layoutClass} ${thresholdClass} ${breakpointClass} ${heightClass} ${backgroundClass} ${layerClass} ${positionClass}`

	return layoutClasses.trim()
}

function getFeedbackStyles(
	props: UiBlockProps,
	status: UiStatus,
	context: UiTextContext,
): string {
	let {size, asset, assetType, variant, align, justify, container} = props

	let variantClass = variant ? `variant:${variant}` : ''
	let sizeClass = size ? `size:${size}` : ''
	// if (fontClass) {
	// 	fontClass = context === 'form' ? `${fontClass}:minus` : fontClass
	// }
	let alignClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''
	let statusClass = status ? `status:${status}` : ''
	let assetTypeClass = assetType ? assetType : 'emoji'
	let assetClass = status
		? `${assetTypeClass}:${status}`
		: asset
			? `${assetTypeClass}:${asset}`
			: ''
	let typeClass = context ? `feedback:${context}` : 'feedback'
	let backgroundClass = context === 'code' ? '' : `bg:${status}:100`
	let containerClass =
		container && context !== 'code' ? `l:${container}:${size}` : ''

	let feedbackClasses = `${typeClass} ${statusClass} ${assetClass} ${sizeClass} ${variantClass} ${alignClass} ${justifyClass} ${backgroundClass} ${containerClass}`

	return feedbackClasses.trim()
}

function getStyles(props: UiBlockProps): string {
	let {
		color,
		size,
		shape,
		align,
		justify,
		asset,
		assetType,
		variant,
		layout,
		container,
		dimensions,
		threshold,
		breakpoint,
		background,
	} = props

	let elementClasses = getElementStyles({
		color,
		size,
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
	getElementStyles,
	getFeedbackStyles,
}
