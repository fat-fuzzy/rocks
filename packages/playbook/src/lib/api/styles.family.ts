import type {StyleNode, IStyleFamily, StyleFamilyOptions} from '$types'
import type {UiContainer, UiLayout, UiSize, UiVariant} from '@fat-fuzzy/ui'
import StyleInputGroup from './styles.input-group'

class StyleFamily implements IStyleFamily {
	id: string
	name: string
	title: string
	items: Array<StyleInputGroup>
	itemsMap: Map<string, StyleInputGroup>
	layout?: UiLayout
	container?: UiContainer
	breakpoint?: UiSize
	threshold?: UiSize
	size?: UiSize
	justify?: string
	variant?: UiVariant

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
		// eslint-disable-next-line
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

export default StyleFamily
