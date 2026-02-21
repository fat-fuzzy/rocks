import type {Snippet} from 'svelte'
import type {GeometryContext, SceneContext} from '$types'

export type PositionProps = {
	color: string
	id?: string
	size: string
	label?: string
	coordX: number
	coordY: number
	coordZ?: number
	maxX: number
	minX?: number
	maxY: number
	minY?: number
	maxZ?: number
	minZ?: number
	disabled?: boolean
	onupdate: (payload: {value: number | undefined}) => void
}

export type RotationProps = {
	color: string
	id?: string
	size: string
	label?: string
	angle: number
	min?: number
	max?: number
	disabled?: boolean
	onupdate: (payload: {value: number | undefined}) => void
}

export type ScaleProps = {
	color: string
	id: string
	size: string
	scaleX: number
	scaleY: number
	scaleZ?: number
	minX: number
	maxX: number
	minY: number
	maxY: number
	minZ?: number
	maxZ?: number
	disabled?: boolean
	onupdate: (payload: {value: number | undefined}) => void
}

export type Geometry2DProps = {
	id?: string
	canvasWidth: number
	canvasHeight: number
	context: GeometryContext
	background?: string
	method?: string
	formaction?: string
	actionPath?: string
	redirect?: string
	size?: string
	layout?: string
	threshold?: string
	disabled?: boolean
	onupdate: (payload: SceneContext) => void
	children?: Snippet
}

export type Geometry3DProps = {
	id?: string
	canvasWidth: number
	canvasHeight: number
	context: GeometryContext
	disabled?: boolean
	threshold?: string
	onupdate: (payload: SceneContext) => void
	children?: Snippet
}
