import type {ComponentType} from 'svelte'
export type ComponentChild = string | ComponentType | (string | ComponentType)[] // TODO: figure out if I really need this

// TODO: figure out if I can extract this info from Svelte component
export interface StyleInputProps {
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

export interface AppStyles extends StyleCategory {
	// theme: StyleFamily  // TODO : figure out if it is possible to do a dynamic import of app theme
	settings: StyleFamily
}
export interface SharedStyles extends StyleCategory {
	context: StyleFamily
}
export interface BlockStyles extends StyleCategory {
	element: StyleFamily
}
export interface LayoutStyles extends StyleCategory {
	element: StyleFamily
}

export interface StyleOptions {
	app: AppStyles
	shared: SharedStyles
	blocks: BlockStyles
	layouts: LayoutStyles
}

/**
 * StyleBlock is used to generate the UI to set a style value in the UI library doc
 */
export interface StyleBlock {
	id: string
	name: string

	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components

	getStyleTree: () => StyleNode | StyleBranch
	getStyleTreeFlat: () => StyleTreeFlat

	canApplyStyles: ({title, category}: {title: string; category: string}) => boolean
	includes: (item: string) => boolean
	excludes: (item: string) => boolean
}

interface StyleApiInput extends StyleBlock {
	slug: string
	input: string
	value: string
	items: Array<StyleInputProps>

	getValue: () => string | undefined
	setValue: (value: string) => void
}

interface StyleApiFamily extends StyleBlock {
	/**
	 * A StyleFamily provides form inputs for related styles that apply to a single StyleCategory
	 */
	items: Array<StyleApiInput>
	itemsMap: Map<string, StyleApiInput>
	container?: string
	size?: string
}

type StyleBlockOptions = {
	id: string
	name: string
	layout?: string
	exclude?: string[] // Add component names here to apply styles to all but excluded components
	include?: string[] // Add component names here to apply styles to included components
}

type StyleInputOptions = StyleBlockOptions & {
	input: string
	items: Array<StyleInputProps>
	value: string
}

type StyleFamilyOptions = StyleBlockOptions & {
	items: Array<StyleApiInput>
	container?: string
	size?: string
}

/**
 * Class Implementations to use
 */
export class StyleInput implements StyleApiInput {
	id: string
	name: string
	slug: string
	input: string
	items: Array<StyleInputProps>
	value: string
	layout?: string
	exclude?: string[]
	include?: string[]

	constructor({id, name, input, items, value, layout, exclude, include}: StyleInputOptions) {
		this.id = id
		this.name = name
		this.slug = name.toLowerCase()
		this.items = items
		this.input = input
		this.value = value ?? ''
		if (layout) {
			this.layout = layout
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

	canApplyStyles({title, category}: {title: string; category: string}) {
		return this.includes(title) && !this.excludes(category) && !this.excludes(title)
	}

	includes(item: string) {
		return this.include ? this.include.indexOf(item) !== -1 : true
	}

	excludes(item: string) {
		return this.exclude ? this.exclude.indexOf(item) !== -1 : false
	}
}

export class StyleFamily implements StyleApiFamily {
	id: string
	name: string
	items: StyleApiInput[]
	itemsMap: Map<string, StyleApiInput>
	layout?: string
	container?: string
	size?: string
	exclude?: string[]
	include?: string[]

	constructor({id, name, items, layout, container, size, exclude, include}: StyleFamilyOptions) {
		this.id = id
		this.name = name
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

	canApplyStyles({title, category}: {title: string; category: string}) {
		return this.includes(title) && !this.excludes(category) && !this.excludes(title)
	}

	includes(item: string) {
		return this.include ? this.include.indexOf(item) !== -1 : true
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
