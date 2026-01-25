import type {Filters} from '$types'
import type {UiColor, UiSize, UiVariant} from '@fat-fuzzy/ui'

export type FiltersProps = {
	id: string
	color?: UiColor
	size?: UiSize
	variant?: UiVariant
	background?: string
	layout?: string
	breakpoint?: string
	threshold?: string
	disabled?: boolean
	channels?: string[]
	blur?: number[]
	convolutions?: string[]
	onupdate: (payload: Filters) => void
}
