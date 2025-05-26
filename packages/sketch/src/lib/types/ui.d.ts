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
}

export type ProgramInfo = {
	context?: SceneContext
	errors: string[]
}

export type SceneMeta = {
	controls: string[]
	id?: string
	title?: string
	asset?: string
	dimensions?: string
	input?: string
	camera?: number
	filename?: string
	filters?: Filters
	draft?: boolean
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
