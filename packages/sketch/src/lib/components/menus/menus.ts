import type {Filters, SceneContext} from '$types'
import type {UiColor, UiLayout, UiSize} from '@fat-fuzzy/ui'

export type CameraControlsProps = {
	id: string
	color?: UiColor
	size?: UiSize
	background?: string
	layout?: UiLayout
	breakpoint?: UiSize
	threshold?: UiSize
	onupdate: (payload: SceneContext) => void // TODO: Fix type
}

export type GeometryControlsProps = {
	id: string
	color?: UiColor
	size?: UiSize
	layout?: UiLayout
	breakpoint?: UiSize
	threshold?: UiSize
	canvas: HTMLCanvasElement
	onupdate: (payload: SceneContext) => void
	context: SceneContext
}

export type TextureControlProps = {
	id: string
	color?: UiColor
	size?: UiSize
	variant?: string
	background?: string
	layout?: UiLayout
	breakpoint?: UiSize
	threshold?: UiSize
	onupdate: (payload: Filters) => void
	filters: Filters
}

export type GridControlProps = {
	id: string
	color?: UiColor
	size?: UiSize
	variant?: string
	background?: string
	layout?: UiLayout
	breakpoint?: UiSize
	threshold?: UiSize
	onupdate: (payload: string[]) => void
	gridItems: {id: string; label: string; group?: string}[]
}
