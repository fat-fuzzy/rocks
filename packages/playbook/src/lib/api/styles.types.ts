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
	families: {element: StyleFamily}
}

export interface BlockStyles extends StyleCategory {
	name: 'blocks'
	families: {element: StyleFamily}
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
	breakpoint?: string
	threshold?: string
	size?: string
	variant?: string
	mode?: string
	assetType?: string

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
		mode,
		assetType,
	}: StyleInputGroupOptions) {
		this.id = id
		this.name = name
		this.slug = name.toLowerCase()
		this.items = items
		this.input = input
		this.value = value ?? ''
		this.assetType = assetType ?? 'emoji'

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
		if (container) {
			this.container = container
		}
		if (mode) {
			this.mode = mode
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
}

export class StyleFamily implements IStyleFamily {
	id: string
	name: string
	title: string
	items: Array<StyleInputGroup>
	itemsMap: Map<string, StyleInputGroup>
	layout?: string
	container?: string
	breakpoint?: string
	threshold?: string
	size?: string
	justify?: string
	variant?: string

	constructor({
		id,
		name,
		title,
		items,
		layout,
		container,
		size,
		variant,
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
	}

	getStyleTree() {
		const [category, family] = this.id.split('.')
		const children = this.items.reduce((childrenTrees, style) => {
			return {...childrenTrees, ...style.getStyleTree()}
		}, {})
		return {families: {[family]: {...children}}}
	}

	getStyleTreeFlat() {
		const [category, family, style] = this.id.split('.')
		return {category, family, style, value: this.items.map((item) => item.id)}
	}

	applyStyles(styles: StyleNode) {
		if (!styles) {
			return
		}
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
