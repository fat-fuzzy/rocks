import type {UiBlockProps, UiLayoutProps} from '$lib/types'

const PROPS_CONTAINER: UiBlockProps = {
	container: 'ravioli',
	size: 'lg',
}

const PROPS_LAYOUT: UiLayoutProps = {
	layout: 'stack',
	size: 'md',
}

const PROPS_BLOCK: UiBlockProps = {
	color: 'primary',
	font: 'md',
	size: 'md',
	variant: 'outline',
	background: 'light',
	layer: 'none',
	shape: 'none',
	justify: 'center',
	align: 'start',
	alignSelf: 'center',
	asset: 'moby',
	assetType: 'emoji',
}

function getContainerClasses(props: UiLayoutProps): string {
	let classes = []
	if (props.container === 'ravioli')
		classes.push(`${props.container}:${props.size}`)
	else if (props.container) {
		classes.push(`${props.container}`)
		if (props.size) classes.push(`size:${props.size}`)
	}

	return classes.join(' ')
}

function getLayoutClasses(props: UiLayoutProps): string {
	let classes = []
	if (
		props.layout === 'stack' ||
		props.layout === 'grid' ||
		props.layout === 'switcher' ||
		props.layout === 'sidebar'
	)
		classes.push(`l:${props.layout}:${props.size}`)
	else if (props.layout) {
		if (props.layout) classes.push(`l:${props.layout}`)
		if (props.size) classes.push(`size:${props.size}`)
	}

	return classes.join(' ')
}

function getBlockClasses(props: UiBlockProps): string {
	let classes = []
	if (props.assetType)
		classes.push(`${props.assetType ?? 'emoji'}:${props.asset}`)
	if (props.color) classes.push(`color:${props.color}`)
	if (props.background) classes.push(`bg:${props.background}`)
	if (props.size) classes.push(`size:${props.size}`)
	if (props.shape) classes.push(`shape:${props.shape}`)
	if (props.variant) classes.push(`variant:${props.variant}`)
	if (props.font) classes.push(`font:${props.font}`)
	if (props.justify) classes.push(`justify:${props.justify}`)
	if (props.alignSelf) classes.push(`align-self:${props.alignSelf}`)
	if (props.align) classes.push(`align:${props.align}`)
	return classes.join(' ')
}

export default {
	PROPS_CONTAINER,
	PROPS_LAYOUT,
	PROPS_BLOCK,
	getContainerClasses,
	getLayoutClasses,
	getBlockClasses,
}
