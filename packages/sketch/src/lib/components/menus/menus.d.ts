import type {
	Filters,
	GeometryContext,
	CameraContext,
	GeometryControlsProps,
	SceneContext,
	TextureContext,
} from '$types'

export type CameraControlsProps = {
	id: string
	color?: string
	size?: string
	background?: string
	layout?: string
	breakpoint?: string
	threshold?: string
	onupdate: (payload: SceneContext) => void // TODO: Fix type
}

export type GeometryControlsProps = {
	id: string
	color?: string
	size?: string
	layout?: string
	breakpoint?: string
	threshold?: string
	canvas: HTMLCanvasElement
	onupdate: (payload: SceneContext) => void
	context: SceneContext
}

export type TextureControlProps = {
	id: string
	color?: string
	size?: string
	variant?: string
	background?: string
	layout?: string
	breakpoint?: string
	threshold?: string
	init: (payload: Filters) => void // TODO: Fix type
	onupdate: (payload: Filters) => void
	filters: Filters
}
