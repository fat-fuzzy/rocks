import type {UiDimension} from '@fat-fuzzy/ui'

export type FeedbackType = {
	status: string
	message: string
}

export type CameraContext = {
	fieldOfView?: number
	cameraAngle?: number
}

export type GeometryContext = {
	color: number[]
	translation: (number | undefined)[]
	rotation: number[]
	scale: (number | undefined)[]
}

export type TextureContext = {
	image?: HTMLImageElement
	filters?: Filters
}

export type SceneContext = {
	geometry?: GeometryContext
	texture?: TextureContext
	camera?: CameraContext
	animationSpeed?: number
	grid?: string[]
}

export type ProgramInfo = {
	context?: SceneContext
	errors: string[]
}

export type SceneMeta = {
	controls: string[]
	id?: string
	title: string
	description?: string
	asset?: string
	dimensions?: UiDimension
	background?: string
	input?: string
	camera?: number
	filename?: string
	filters?: Filters
	grid?: {id: string; label: string; group?: string | undefined}[]
	draft?: boolean
	warnings?: {title: string; message: string}[]
	categories: string[]
}

export type Filters = {
	channels?: string[]
	blur: number[]
	convolutions?: string[]
}

export type SceneOptions = {
	url?: string
	filters: Filters
}

export type Scene = {
	meta: SceneMeta
	init: () => void
	draw: (time?: number) => void
	main: (
		canvas: HTMLCanvasElement,
		options?: SceneOptions,
	) => Promise<SceneContext>
	update: (value: SceneContext, event?: MouseEvent | TouchEvent) => void
	clear: () => void
	stop: () => void
}
