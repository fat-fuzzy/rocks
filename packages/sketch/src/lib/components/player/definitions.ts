import type {
	PlayerEventsType,
	PlayerActionsType,
	PlayerTransitionsType,
} from '$types'
import {PlayerEvent, PlayerState, PlayerAction, EventOrder} from '$types'

export const PLAYER_SWITCH = {
	active: {
		id: 'active',
		value: PlayerEvent.pause as string,
		text: 'pause',
		asset: 'pause',
		variant: 'outline',
		state: 'active',
	},
	inactive: {
		id: 'inactive',
		value: PlayerEvent.play as string,
		text: 'play',
		asset: 'play',
		variant: 'fill',
		state: 'inactive',
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
		PlayerAction.snap,
	],
	[PlayerState.paused]: [
		PlayerAction.play,
		PlayerAction.stop,
		PlayerAction.clear,
		PlayerAction.snap,
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
		[PlayerEvent.snap]: PlayerState.playing,
	},
	[PlayerState.paused]: {
		[PlayerEvent.play]: PlayerState.playing,
		[PlayerEvent.stop]: PlayerState.idle,
		[PlayerEvent.clear]: PlayerState.paused,
		[PlayerEvent.snap]: PlayerState.paused,
	},
}
