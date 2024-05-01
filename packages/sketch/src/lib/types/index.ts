export enum PlayerState {
	idle = 'idle',
	playing = 'playing',
	paused = 'paused',
	ended = 'ended',
	stopped = 'stopped',
}

export enum PlayerEvent {
	start = 'start',
	pause = 'pause',
	play = 'play',
	clear = 'clear',
	stop = 'stop',
}
export enum GeometryState {
	untouched = 'untouched',
	updated = 'updated',
}

export type PlayerPayload = {event: PlayerEvent; state: PlayerState}

export enum CanvasState {
	idle = 'idle',
	playing = 'playing',
	paused = 'paused',
	ended = 'ended',
}

export enum CanvasEvent {
	start = 'start',
	pause = 'pause',
	play = 'play',
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
