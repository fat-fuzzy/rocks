import type {
	UiColor,
	UiContainer,
	UiLayout,
	UiSize,
	UiStatus,
	UiVariant,
} from '@fat-fuzzy/ui'

// TODO: figure out if I can extract this info from Svelte component
interface IStyleInputOptions {
	id: string
	value: string
	[key: string]: string
}

export type StyleInputOptions = {
	id: string
	asset?: string
	assetType?: string
	size?: UiSize
	label?: string
	text?: string
	value: string
	brightness?: string
	contrast?: string
	app?: string
	container?: UiContainer
	content?: string
	breakpoint?: UiSize
	threshold?: UiSize
	variant?: UiVariant
	color?: UiColor
	layout?: UiLayout
	status?: UiStatus
}

/**
 * Use a tree structure to store the styles of the app
 */
export type StyleNode = {
	[style: string]: string
}

export type StyleBranch = {
	families: {[family: string]: StyleNode}
}

export type StyleTree = {
	[category: string]: StyleBranch
}

export type StyleTreeFlat = {
	category: string
	family: string
	style: string
	value: string | string[]
}

export interface StyleCategory {
	name: string
	families: {[key: string]: IStyleFamily}
}

export interface AppStyles extends StyleCategory {
	name: 'app'
	families: {settings: IStyleFamily}
}

export interface TokenStyles extends StyleCategory {
	name: 'tokens'
	families: {token: IStyleFamily}
}

export interface BlockStyles extends StyleCategory {
	name: 'blocks'
	families: {block: IStyleFamily}
}

export interface LayoutStyles extends StyleCategory {
	name: 'layouts'
	families: {
		layout: IStyleFamily
		container: IStyleFamily
		content: IStyleFamily
	}
}

export interface StyleOptions {
	app: AppStyles
	tokens: TokenStyles
	blocks: BlockStyles
	layouts: LayoutStyles
}

/**
 * StylesSet is used to generate the UI to set a style value in the UI library doc
 */
export interface IStylesSet {
	id: string
	name: string

	layout?: UiLayout
	container?: UiContainer
	breakpoint?: UiSize
	threshold?: UiSize
	size?: UiSize
	variant?: UiVariant
	mode?: string
	assetType?: string

	getStyleTree: () => StyleNode | StyleBranch
	getStyleTreeFlat: () => StyleTreeFlat
}

export interface IStyleInputGroup extends IStylesSet {
	slug: string
	input: string
	value: string
	items: Array<IStyleInputOptions>

	getValue: () => string
	setValue: (value: string) => void
}

export interface IStyleFamily extends IStylesSet {
	/**
	 * A StyleFamily provides form inputs for related styles that apply to a single StyleCategory
	 */
	items: Array<IStyleInputGroup>
	itemsMap: Map<string, IStyleInputGroup>
}

export type StylesSetOptions = {
	id: string
	name: string
	layout?: UiLayout
	container?: UiContainer
	breakpoint?: UiSize
	threshold?: UiSize
	size?: UiSize
	variant?: UiVariant
	mode?: string
	assetType?: string
}

export type StyleInputGroupOptions = StylesSetOptions & {
	input: string
	value: string
	items: Array<StyleInputOptions>
}

export type StyleFamilyOptions = StylesSetOptions & {
	title: string
	items: Array<IStyleInputGroup>
}
