export enum ControlsState {
	pristine = 'pristine',
	updated = 'updated',
	hidden = 'hidden',
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
	error = 'error',
}

export enum CanvasEvent {
	start = 'start',
	pause = 'pause',
	play = 'play',
	clear = 'clear',
	stop = 'stop',
	loadNok = 'loadNok',
	error = 'error',
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
	exitNok = 'exitNok',
}

export enum SketchAction {
	load = 'load',
	exit = 'exit',
}

export enum EventOrder {
	previous = 'previous',
	current = 'current',
}
export enum PlayerState {
	idle = 'idle',
	loading = 'loading',
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
	loadOk = 'loadOk',
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
