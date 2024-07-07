import {UiStatus, type UiBlockProps, type UiTextContext} from '$types/index.js'

function getElementStyles(props: UiBlockProps): string {
	let {color, size, shape, align, justify, asset, variant, background} = props

	/* Element styles */
	let colorClass = color ? `color:${color}` : '' // TODO: clarify bg/color/surface
	let backgroundClass = color ? `bg:${color}` : ''
	let sizeClass = size ? `size:${size}` : ''
	let fontClass = size ? `font:${size}` : ''
	let assetClass = asset ? `emoji:${asset}` : ''
	let variantClass = variant ? `variant:${variant}` : ''
	let shapeClass = shape ? ` shape:${shape}` : ''
	let alignClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''

	let elementClasses = `${assetClass} ${colorClass} ${backgroundClass} ${sizeClass} ${shapeClass} ${variantClass} ${alignClass} ${justifyClass} ${fontClass}`

	return elementClasses.trim()
}

/**
 * Context styles
 */
function getContainerStyles(props: UiBlockProps): string {
	let {size, container, dimensions} = props

	let containerClass =
		container && dimensions
			? `l:${container}:${dimensions}`
			: container && size
				? `l:${container}:${size}`
				: ''

	return containerClass.trim()
}

function getLayoutStyles(props: UiBlockProps): string {
	let {size, shape, layout, threshold, breakpoint} = props
	let thresholdClass = threshold ? `th:${threshold}` : ''
	let breakpointClass = breakpoint ? `bp:${breakpoint}` : ''
	let layoutClass = layout && shape ? 'stack' : layout
	layoutClass =
		layout && size ? `l:${layout}:${size}` : layout ? `l:${layout}` : ''

	let layoutClasses = `${layoutClass} ${thresholdClass} ${breakpointClass}`

	return layoutClasses.trim()
}

function getFeedbackStyles(
	props: UiBlockProps,
	status: UiStatus,
	type: UiTextContext,
): string {
	let {size, asset, variant, align, justify} = props
	let variantClass = variant ? `variant:${variant}` : ''
	let fontClass = size ? `font:${size}:minus` : ''
	let alignClass = align ? `align:${align}` : ''
	let justifyClass = justify ? `justify:${justify}` : ''
	let statusClass = status ? `status:${status}` : ''
	let assetClass = asset ? `emoji:${asset}` : ''
	let typeClass = type ? `feedback:${type}` : 'feedback'

	let feedbackClasses = `${typeClass} ${statusClass} ${assetClass} ${fontClass} ${variantClass} ${alignClass} ${justifyClass}`

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
		variant,
		layout,
		container,
		dimensions,
		threshold,
		breakpoint,
	} = props

	let elementClasses = getElementStyles({
		color,
		size,
		shape,
		align,
		justify,
		asset,
		variant,
	})

	let containerClasses = getContainerStyles({size, container, dimensions})
	let layoutClasses = getLayoutStyles({
		size,
		shape,
		layout,
		threshold,
		breakpoint,
	})

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
