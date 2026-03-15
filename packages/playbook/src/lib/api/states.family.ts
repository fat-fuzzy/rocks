import type {
	IPlaybookFamily,
	PlaybookFamilyOptions,
	IPlaybookInputGroup,
} from '$types'
import type {UiContainer, UiLayout, UiSize, UiVariant} from '@fat-fuzzy/ui'

class StateFamily implements IPlaybookFamily {
	id: string
	name: string
	title: string
	items: Array<IPlaybookInputGroup>
	itemsMap: Map<string, IPlaybookInputGroup>
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
	}: PlaybookFamilyOptions) {
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
}

export default StateFamily
