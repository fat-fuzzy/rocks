import type {
	IPlaybookInputGroup,
	PlaybookInputOptions,
	PlaybookInputGroupOptions,
} from '$types'
import type {UiContainer, UiLayout, UiSize, UiVariant} from '@fat-fuzzy/ui'

/**
 * Class Implementations to use
 */
class StateInputGroup implements IPlaybookInputGroup {
	id: string
	name: string
	slug: string
	input: string
	items: Array<PlaybookInputOptions>
	value: string
	layout?: UiLayout
	container?: UiContainer
	breakpoint?: UiSize
	threshold?: UiSize
	size?: UiSize
	variant?: UiVariant
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
	}: PlaybookInputGroupOptions) {
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
}

export default StateInputGroup
