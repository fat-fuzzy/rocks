import type {
	UiBlockProps,
	UiContainerProps,
	UiLayoutProps,
	UiStatus,
} from '$lib/types'

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
			dimensions: 'square',
		},
		expected: 'l:frame:square',
	},
	{
		props: {
			container: 'frame',
		},
		expected: 'l:frame',
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
		expected: 'l:stack:md align:center justify:center shape:round',
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
	{
		props: {
			layout: 'reveal',
			position: 'sticky',
		},
		expected: 'l:reveal sticky',
	},
	{
		props: {
			layout: 'reveal',
			breakpoint: 'md',
		},
		expected: 'l:reveal bp:md',
	},
	{
		props: {
			scroll: 'y',
			height: 'md',
		},
		expected: 'h:md scroll:y',
	},
]

const PROPS_BLOCK: {props: UiBlockProps; expected: string}[] = [
	{
		props: {
			color: 'primary',
			font: 'md',
			variant: 'outline',
			asset: 'home',
			assetType: 'svg',
		},
		expected: 'bg:primary svg:home color:primary font:md variant:outline',
	},
]

const PROPS_FEEDBACK: {
	props: {props: UiBlockProps; status: UiStatus; context: string}
	expected: string
}[] = [
	{
		props: {
			props: {
				size: 'md',
				variant: 'bare',
			},
			status: 'warning',
			context: 'code',
		},
		expected: 'size:md variant:bare status:warning feedback:code',
	},
	{
		props: {
			props: {
				size: 'md',
				variant: 'outline',
				shape: 'round',
				justify: 'end',
				container: 'raviolink',
			},
			status: 'default',
			context: 'prose',
		},
		expected:
			'l:stack:md align:center justify:center shape:round variant:outline bg:default:100 raviolink status:default feedback:prose',
	},
]

export {PROPS_CONTAINER, PROPS_LAYOUT, PROPS_BLOCK, PROPS_FEEDBACK}
