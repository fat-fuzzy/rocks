export enum ControlsState {
	pristine = 'pristine',
	updated = 'updated',
}

export enum ControlsEvent {
	update = 'update',
	pause = 'pause',
}

export enum ControlsAction {
	update = 'update',
}
export enum CanvasState {
	loading = 'loading',
	idle = 'idle',
	playing = 'playing',
	paused = 'paused',
	stopped = 'stopped',
}

export enum CanvasEvent {
	start = 'start',
	pause = 'pause',
	play = 'play',
	clear = 'clear',
	stop = 'stop',
}

export enum CanvasAction {
	play = 'play',
	pause = 'pause',
	clear = 'clear',
	stop = 'stop',
}

export enum SketchState {
	idle = 'idle',
	active = 'active',
	loading = 'loading',
	error = 'error',
}

export enum SketchEvent {
	load = 'load',
	cancel = 'cancel',
	exit = 'exit',
	loadOk = 'loadOk',
	loadNok = 'loadNok',
}

export enum SketchAction {
	load = 'load',
	exit = 'exit',
}

export enum EventOrder {
	previous = 'previous',
	current = 'current',
}

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

export type SceneContext = (
	| GeometryContext
	| TextureContext
	| CameraContext
) & {
	animationSpeed?: number
}

export type ProgramInfo = {
	context?: SceneContext
	errors: string[]
}

export type SceneMeta = {
	type?: string
	input?: string
	camera?: number
	filename?: string
	channels?: string[]
	blur?: number
	convolutions?: string[]
}

export type Filters = {
	channels?: string
	blur?: number
	effects?: string[]
}

export type SceneOptions = {
	url?: string
	filters: Filters
}

export type Scene = {
	id: string
	meta?: SceneMeta
	init: () => void
	draw: (time?: number) => void
	main: (canvas: HTMLCanvasElement, options?: SceneOptions) => SceneContext
	update: (value: SceneContext, event?: MouseEvent | TouchEvent) => void
	clear: () => void
	stop: () => void
}
