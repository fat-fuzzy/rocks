export type ControlsState = 'pristine' | 'updated' | 'hidden'

export type ControlsEvent = 'update' | 'pause'

export type ControlsAction = 'update'

export type CanvasState =
	| 'loading'
	| 'idle'
	| 'playing'
	| 'paused'
	| 'stopped'
	| 'error'

export type CanvasEvent =
	| 'start'
	| 'pause'
	| 'play'
	| 'clear'
	| 'stop'
	| 'loadNok'
	| 'error'

export type CanvasAction = 'play' | 'pause' | 'clear' | 'stop'

export type SketchState = 'idle' | 'active' | 'loading' | 'error'

export type SketchEvent =
	| 'load'
	| 'cancel'
	| 'exit'
	| 'loadOk'
	| 'loadNok'
	| 'exitNok'

export type SketchAction = 'load' | 'exit'

export type EventOrder = 'previous' | 'current'

export type PlayerState =
	| 'idle'
	| 'loading'
	| 'error'
	| 'playing'
	| 'paused'
	| 'ended'
	| 'stopped'

export type PlayerEvent =
	| 'play'
	| 'pause'
	| 'clear'
	| 'stop'
	| 'snap'
	| 'loadOk'

export type PlayerAction = 'play' | 'pause' | 'clear' | 'stop' | 'snap'

export type PlayerError = 'load' | 'play' | 'clear' | 'stop'
