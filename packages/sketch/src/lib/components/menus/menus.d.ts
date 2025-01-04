import type {
	GeometryContext,
	CameraContext,
	GeometryControlsProps,
	SceneContext,
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
