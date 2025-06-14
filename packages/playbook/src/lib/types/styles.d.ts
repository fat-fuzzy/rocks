// TODO: figure out if I can extract this info from Svelte component
interface IStyleInputOptions {
	[key: string]: string
}

export type StyleInputOptions = {
	id: string
	asset?: string
	assetType?: string
	size?: string
	label?: string
	text?: string
	value: string
	brightness?: string
	contrast?: string
	app?: string
	container?: string
	content?: string
	breakpoint?: string
	threshold?: string
	variant?: string
	color?: string
	layout?: string
	status?: string
}

/**
 * Use a tree structure to store the styles of the app
 */
type StyleNode = {
	[style: string]: string
}

type StyleBranch = {
	families: {[family: string]: StyleNode}
}

export type StyleTree = {
	[category: string]: StyleBranch
}

type StyleTreeFlat = {
	category: string
	family: string
	style: string
	value: string | string[]
}

export interface StyleCategory {
	name: string
	families: {[key: string]: StyleFamily}
}

export interface AppStyles extends StyleCategory {
	name: 'app'
	families: {settings: StyleFamily}
}

export interface TokenStyles extends StyleCategory {
	name: 'tokens'
	families: {token: StyleFamily}
}

export interface BlockStyles extends StyleCategory {
	name: 'blocks'
	families: {block: StyleFamily}
}

export interface LayoutStyles extends StyleCategory {
	name: 'layouts'
	families: {
		layout: StyleFamily
		container: StyleFamily
		content: StyleFamily
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

	layout?: string
	container?: string
	breakpoint?: string
	threshold?: string
	size?: string
	variant?: string
	mode?: string
	assetType?: string

	getStyleTree: () => StyleNode | StyleBranch
	getStyleTreeFlat: () => StyleTreeFlat
}

interface IStyleInputGroup extends IStylesSet {
	slug: string
	input: string
	value: string
	items: Array<IStyleInputOptions>

	getValue: () => string | undefined
	setValue: (value: string) => void
}

interface IStyleFamily extends IStylesSet {
	/**
	 * A StyleFamily provides form inputs for related styles that apply to a single StyleCategory
	 */
	items: Array<IStyleInputGroup>
	itemsMap: Map<string, IStyleInputGroup>
}

type StylesSetOptions = {
	id: string
	name: string
	layout?: string
	container?: string
	breakpoint?: string
	threshold?: string
	size?: string
	variant?: string
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
	items: Array<StyleInputGroup>
}
