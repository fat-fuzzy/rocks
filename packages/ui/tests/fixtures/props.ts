import type {UiBlockProps, UiContainerProps, UiLayoutProps} from '$lib/types'

const PROPS_CONTAINER: {props: UiContainerProps; expected: string}[] = [
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

const PROPS_LAYOUT: {props: UiLayoutProps; expected: string}[] = [
	{
		props: {
			layout: 'stack',
			size: '2xl',
		},
		expected: 'l:stack:2xl',
	},
	{
		props: {
			layout: 'switcher',
			size: 'xl',
			threshold: 'md',
		},
		expected: 'l:switcher:xl th:md',
	},
	{
		props: {
			layout: 'grid',
			size: 'lg',
		},
		expected: 'l:grid:lg',
	},
	{
		props: {
			layout: 'switcher',
			size: 'md',
			shape: 'round',
			threshold: 'md',
		},
		expected: 'l:stack:md shape:round',
	},
	{
		props: {
			layout: 'switcher',
			size: 'md',
			shape: 'pill',
			threshold: 'md',
		},
		expected: 'l:switcher:md th:md shape:pill',
	},
	{
		props: {
			layout: 'grid',
			size: 'md',
			layer: '1',
		},
		expected: 'l:grid:md layer:1',
	},
]

const PROPS_BLOCK: {props: UiBlockProps; expected: string}[] = [
	{
		props: {
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
			asset: 'home',
			assetType: 'svg',
		},
		expected:
			'size:md bg:light align:start align-self:center svg:home color:primary font:md justify:center variant:outline',
	},
]

export {PROPS_CONTAINER, PROPS_LAYOUT, PROPS_BLOCK}
