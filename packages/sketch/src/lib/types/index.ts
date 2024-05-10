export enum PlayerState {
	idle = 'idle',
	error = 'error',
	playing = 'playing',
	paused = 'paused',
	ended = 'ended',
	stopped = 'stopped',
}

export enum PlayerEvent {
	play = 'play',
	pause = 'pause',
	clear = 'clear',
	stop = 'stop',
}

export enum PlayerAction {
	play = 'play',
	pause = 'pause',
	clear = 'clear',
	stop = 'stop',
}

export enum PlayerError {
	load = 'load',
	play = 'play',
	clear = 'clear',
	stop = 'stop',
}

export enum GeometryState {
	untouched = 'untouched',
	updated = 'updated',
}

export enum GeometryEvent {
	update = 'update',
	pause = 'pause',
}

export enum GeometryAction {
	update = 'update',
}

export type PlayerPayload = {event: PlayerEvent; state: PlayerState}

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
