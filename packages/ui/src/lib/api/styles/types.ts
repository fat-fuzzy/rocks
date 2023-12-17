import type {ComponentType} from 'svelte'
export type ComponentChild = string | ComponentType | (string | ComponentType)[] // TODO: figure out if I really need this

// TODO: figure out if I can extract this info from Svelte component
interface IStyleInputOptions {
	[key: string]: string
}

export type StyleInputOptions = {
	id: string
	asset?: string
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
	variant?: string
	color?: string
	layout?: string
	// options?: StyleOption
}

/**
 * Use a tree structure to store the styles of the app
 */
type StyleNode = {
	[style: string]: string
}
type StyleBranch = {
	[family: string]: StyleNode
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
	[key: string]: StyleFamily
}

export interface TokenStyles extends StyleCategory {
	// theme: StyleFamily  // TODO : figure out if it is possible to do a dynamic import of tokens
	element: StyleFamily
}
export interface AppStyles extends StyleCategory {
	// theme: StyleFamily  // TODO : figure out if it is possible to do a dynamic import of app theme
	settings: StyleFamily
}
export interface SharedStyles extends StyleCategory {
	container: StyleFamily
	layout: StyleFamily
}
export interface BlockStyles extends StyleCategory {
	element: StyleFamily
}
export interface LayoutStyles extends StyleCategory {
	content: StyleFamily
	element: StyleFamily
}

export interface StyleOptions {
	app: AppStyles
	tokens: TokenStyles
	shared: SharedStyles
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
	size?: string
	variant?: string

	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components

	getStyleTree: () => StyleNode | StyleBranch
	getStyleTreeFlat: () => StyleTreeFlat

	canApplyStyles: ({item, category}: {item: string; category: string}) => boolean
	includes: (item: string) => boolean
	excludes: (item: string) => boolean
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
	size?: string
	variant?: string

	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components
}

type StyleInputGroupOptions = StylesSetOptions & {
	input: string
	items: Array<StyleInputOptions>
	value: string
}

type StyleFamilyOptions = StylesSetOptions & {
	title: string
	items: Array<StyleInputGroup>
	container?: string
	size?: string
}

/**
 * Class Implementations to use
 */
export class StyleInputGroup implements IStyleInputGroup {
	id: string
	name: string
	slug: string
	input: string
	items: Array<StyleInputOptions>
	value: string
	layout?: string
	container?: string
	size?: string
	variant?: string
	exclude?: string[]
	include?: string[]

	constructor({
		id,
		name,
		input,
		items,
		value,
		layout,
		container,
		size,
		variant,
		exclude,
		include,
	}: StyleInputGroupOptions) {
		this.id = id
		this.name = name
		this.slug = name.toLowerCase()
		this.items = items
		this.input = input
		this.value = value ?? ''
		if (layout) {
			this.layout = layout
		}
		if (container) {
			this.container = container
		}
		if (size) {
			this.size = size
		}
		if (variant) {
			this.variant = variant
		}
		if (exclude) {
			this.exclude = exclude
		}
		if (include) {
			this.include = include
		}
	}

	getValue() {
		return this.value
	}

	setValue(value: string) {
		this.value = value
	}

	getStyleTree() {
		const [category, family, style] = this.id.split('.')
		return {[style]: this.value}
	}

	getStyleTreeFlat() {
		const [category, family, style] = this.id.split('.')
		return {category, family, style, value: this.value}
	}

	canApplyStyles({item, category}: {item: string; category: string}) {
		return (!this.excludes(category) && !this.excludes(item)) || this.includes(item)
	}

	includes(item: string) {
		return this.include ? this.include.indexOf(item) !== -1 : false
	}

	excludes(item: string) {
		return this.exclude ? this.exclude.indexOf(item) !== -1 : false
	}
}

export class StyleFamily implements IStyleFamily {
	id: string
	name: string
	title: string
	items: Array<StyleInputGroup>
	itemsMap: Map<string, StyleInputGroup>
	layout?: string
	container?: string
	size?: string
	variant?: string
	exclude?: string[]
	include?: string[]

	constructor({
		id,
		name,
		title,
		items,
		layout,
		container,
		size,
		variant,
		exclude,
		include,
	}: StyleFamilyOptions) {
		this.id = id
		this.name = name
		this.title = title
		this.items = items

		const itemsMap = new Map()
		items.forEach((item) => {
			itemsMap.set(item.slug, item)
		})
		this.itemsMap = itemsMap

		if (layout) {
			this.layout = layout
		}
		if (container) {
			this.container = container
		}
		if (size) {
			this.size = size
		}
		if (variant) {
			this.variant = variant
		}
		if (exclude) {
			this.exclude = exclude
		}
		if (include) {
			this.include = include
		}
	}

	getStyleTree() {
		const [category, family] = this.id.split('.')
		const children = this.items.reduce((childrenTrees, style) => {
			return {...childrenTrees, ...style.getStyleTree()}
		}, {})
		return {[family]: {...children}}
	}

	getStyleTreeFlat() {
		const [category, family, style] = this.id.split('.')
		return {category, family, style, value: this.items.map((item) => item.id)}
	}

	canApplyStyles({item, category}: {item: string; category: string}) {
		return (!this.excludes(category) && !this.excludes(item)) || this.includes(item)
	}

	includes(item: string) {
		return this.include ? this.include.indexOf(item) !== -1 : false
	}

	excludes(item: string) {
		return this.exclude ? this.exclude.indexOf(item) !== -1 : false
	}

	applyStyles(styles: StyleNode) {
		Object.keys(styles).forEach((key) => {
			const item = this.itemsMap.get(key)
			if (item) {
				item.setValue(styles[key])
				this.itemsMap.set(key, item)
			}
		})
		this.items = Array.from(this.itemsMap.values())
	}
}
