import type {UiBlockProps, UiLayoutProps} from '$lib/types'

const PROPS_CONTAINER: {props: UiLayoutProps; expected: string}[] = [
	{
		props: {
			container: 'burrito',
			size: '2xl',
			layer: '1',
		},
		expected: 'layer:1 l:burrito:2xl',
	},
	{
		props: {
			container: 'burrito',
			size: 'lg',
		},
		expected: 'l:burrito:lg',
	},
	{
		props: {
			container: 'taco',
			size: 'md',
		},
		expected: 'l:taco:md',
	},
	{
		props: {
			container: 'ravioli',
			size: 'sm',
		},
		expected: 'ravioli:sm',
	},
	{
		props: {
			container: 'frame',
			size: 'xl',
			dimensions: 'square',
		},
		expected: 'l:frame:square size:xl',
	},
	{
		props: {
			container: 'frame',
			size: 'xs',
		},
		expected: 'l:frame:xs',
	},
	{
		props: {
			container: 'frame',
			size: 'xs',
		},
		expected: 'l:frame:xs',
	},
]

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

function getLayoutClasses(props: UiLayoutProps): string {
	const classes = []
	if (props.layout === 'stack') classes.push(`l:${props.layout}:${props.size}`)
	else if (props.layout) {
		if (props.layout) classes.push(`l:${props.layout}`)
		if (props.size) classes.push(`size:${props.size}`)
	}

	return classes.join(' ')
}

function getBlockClasses(props: UiBlockProps): string {
	const classes = []
	if (props.color) classes.push(`color:${props.color}`)
	if (props.background) classes.push(`bg:${props.background}`)
	if (props.size) classes.push(`size:${props.size}`)
	if (props.font) classes.push(`font:${props.font}`)
	if (props.assetType)
		classes.push(`${props.assetType ?? 'emoji'}:${props.asset}`)
	if (props.variant) classes.push(`variant:${props.variant}`)
	if (props.shape) classes.push(`shape:${props.shape}`)
	if (props.alignSelf) classes.push(`align-self:${props.alignSelf}`)
	if (props.align) classes.push(`align:${props.align}`)
	if (props.justify) classes.push(`justify:${props.justify}`)
	return classes.join(' ')
}

export {
	PROPS_CONTAINER,
	PROPS_LAYOUT,
	PROPS_BLOCK,
	getLayoutClasses,
	getBlockClasses,
}
