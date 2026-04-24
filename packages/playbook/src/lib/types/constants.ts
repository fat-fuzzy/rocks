import type {StyleTree, Meta} from '$types'
import type {UiColor, UiShape, UiSize, UiVariant} from '@fat-fuzzy/ui'

const NUMBER_TO_SIZE: {[key: string]: string} = {
	// TODO: figure out a better way to map range number values to class strings
	'0': 'xs',
	'25': 'sm',
	'50': 'md',
	'75': 'lg',
	'100': 'xl',
}

const DEFAULT_STYLES: StyleTree = {
	tokens: {
		families: {
			token: {color: 'primary', typography: 'h1'},
		},
	},
	app: {
		families: {
			settings: {
				brightness: 'day',
				contrast: 'blend',
			},
		},
	},
	blocks: {
		families: {
			block: {
				variant: 'fill',
				color: '',
				status: 'default',
				context: 'form',
				asset: 'emoji:default',
				size: 'md',
				shape: 'none',
			},
		},
	},
	layouts: {
		families: {
			container: {container: 'taco', size: 'md'},
		},
	},
}

const DEFAULT_META: Meta = {
	title: '',
	slug: '',
	status: '',
	props_state: [],
	content_types: [],
	context: ['app.settings'],
}

const TABS = [
	{
		slug: 'doc',
		label: 'Doc',
		title: 'Doc',
		initial: true,
		variant: 'link' as UiVariant,
		color: 'primary' as UiColor,
		size: 'xs' as UiSize,
		shape: 'round' as UiShape,
		asset: 'doc',
	},
	{
		slug: 'playbook',
		label: 'playbook',
		title: 'Playbook',
		initial: false,
		variant: 'link' as UiVariant,
		color: 'accent' as UiColor,
		size: 'xs' as UiSize,
		shape: 'round' as UiShape,
		asset: 'playbook',
	},
]
export default {
	DEFAULT_STYLES,
	NUMBER_TO_SIZE,
	DEFAULT_META,
	TABS,
}
