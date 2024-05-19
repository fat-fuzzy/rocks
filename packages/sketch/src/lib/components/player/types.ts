import {EventOrder} from '$types/index.js'

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

export type PlayerUi = 'play' | 'pause' | 'stop' | 'clear'

export type PlayButtonState = 'active' | 'inactive'

export type PlayerStateType = {
	[ui in PlayerUi]: PlayerState | PlayerState[]
}

export type PlayerSwitchType = {
	[state in PlayButtonState]: PlayerSwitchState
}

export type PlayerEventsType = {
	[order in EventOrder]: PlayerEvent | ''
}

export type PlayerActionsType = {
	[state in PlayerState]?: PlayerAction[]
}

export type PlayerTransitionsType = {
	[key in PlayerState]?: {
		[key in PlayerEvent]?: PlayerState
	}
}

export type PlayerPayload = {event: PlayerEvent; state: PlayerState}

export type PlayerSwitchState = {
	value: PlayerEvent.pause | PlayerEvent.play
	text: string
	asset: string
	variant: string
	onclick?: (payload: PlayerPayload) => void
}

export const PLAYER_SWITCH: PlayerSwitchType = {
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

export const PLAYER_EVENTS: PlayerEventsType = {
	[EventOrder.previous]: '',
	[EventOrder.current]: '',
}

export const PLAYER_ACTIONS: PlayerActionsType = {
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
}

export const PLAYER_TRANSITIONS: PlayerTransitionsType = {
	[PlayerState.idle]: {
		[PlayerEvent.play]: PlayerState.playing,
	},
	[PlayerState.playing]: {
		[PlayerEvent.pause]: PlayerState.paused,
		[PlayerEvent.stop]: PlayerState.idle,
		[PlayerEvent.clear]: PlayerState.playing,
	},
	[PlayerState.paused]: {
		[PlayerEvent.play]: PlayerState.playing,
		[PlayerEvent.stop]: PlayerState.idle,
		[PlayerEvent.clear]: PlayerState.paused,
	},
}
