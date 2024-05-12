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

export type GeometryProps = {
	color: number[]
	translation: (number | undefined)[]
	rotation: number[]
	scale: (number | undefined)[]
}

export type SceneContext = GeometryProps & {
	fieldOfView?: number
	cameraAngle?: number
	animationSpeed?: number
	pause?: boolean
	image?: HTMLImageElement
}

export type ProgramInfo = {
	context: SceneContext
}

export type SceneMeta = {
	input: string
	type: string
	camera: number
	filename?: string
	channels?: string[]
	blur?: string[]
	convolutions?: string[]
}

export type Filters = {
	channels?: string
	blur?: string
	effects?: string[]
}

export type SceneOptions = {
	url?: string
	filters: Filters
}

export type Scene = {
	id: string
	draw: () => void
	clear: () => void
	update: (value: SceneContext, event?: MouseEvent | TouchEvent) => void
	main: (canvas: HTMLCanvasElement, options?: SceneOptions) => ProgramInfo
	meta?: SceneMeta
}
