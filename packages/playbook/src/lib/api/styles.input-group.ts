import type {
	IStyleInputGroup,
	StyleInputOptions,
	StyleInputGroupOptions,
} from '$types'

/**
 * Class Implementations to use
 */
class StyleInputGroup implements IStyleInputGroup {
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

export default StyleInputGroup
