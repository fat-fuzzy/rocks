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

export type PlayerPayload = {event: PlayerEvent; state: PlayerState}
export type PlayerSwitchState = {
	value: PlayerEvent.pause | PlayerEvent.play
	text: string
	asset: string
	variant: string
	onclick?: (payload: PlayerPayload) => void
}

const PLAYER_STATE: {[key: string]: any} = {
	player: PlayerState.idle,
	errors: [],
}

const PLAYER_SWITCH: {[state: string]: PlayerSwitchState} = {
	active: {
		value: PlayerEvent.pause,
		text: 'Pause',
		asset: 'emoji:pause',
		variant: 'outline',
	},
	inactive: {
		value: PlayerEvent.play,
		text: 'Play',
		asset: 'emoji:play',
		variant: 'fill',
	},
}

const PLAYER_EVENTS: {[key: string]: string} = {
	previous: '',
	current: '',
}

const PLAYER_ACTIONS: {[key: string]: any} = {
	player: {
		[PlayerState.idle]: [PlayerAction.play],
		[PlayerState.playing]: [
			PlayerAction.pause,
			PlayerAction.stop,
			PlayerAction.clear,
		],
		[PlayerState.paused]: [
			PlayerAction.play,
			PlayerAction.stop,
			PlayerAction.clear,
		],
		[PlayerState.stopped]: [PlayerAction.play],
	},
}

const PLAYER_TRANSITIONS: {[key: string]: any} = {
	player: {
		[PlayerState.idle]: {
			[PlayerEvent.play]: {state: PlayerState.playing},
		},
		[PlayerState.playing]: {
			[PlayerEvent.pause]: {state: PlayerState.paused},
			[PlayerEvent.stop]: {state: PlayerState.idle},
			[PlayerEvent.clear]: {state: PlayerState.playing},
		},
		[PlayerState.paused]: {
			[PlayerEvent.play]: {state: PlayerState.playing},
			[PlayerEvent.stop]: {state: PlayerState.idle},
			[PlayerEvent.clear]: {state: PlayerState.paused},
		},
	},
}

export default {
	PLAYER_STATE,
	PLAYER_EVENTS,
	PLAYER_ACTIONS,
	PLAYER_TRANSITIONS,
	PLAYER_SWITCH,
}
