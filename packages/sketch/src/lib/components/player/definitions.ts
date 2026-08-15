import type {
	PlayerEventsType,
	PlayerActionsType,
	PlayerTransitionsType,
} from '$types'

export const PLAYER_SWITCH = {
	active: {
		id: 'active',
		value: 'pause',
		text: 'pause',
		asset: 'pause',
		variant: 'outline',
		state: 'active',
	},
	inactive: {
		id: 'inactive',
		value: 'play',
		text: 'play',
		asset: 'play',
		variant: 'fill',
		state: 'inactive',
	},
}

export const PLAYER_EVENTS: PlayerEventsType = {
	previous: '',
	current: '',
}

export const PLAYER_ACTIONS: PlayerActionsType = {
	idle: ['play'],
	playing: ['pause', 'stop', 'clear', 'snap'],
	paused: ['play', 'stop', 'clear', 'snap'],
	stopped: ['play'],
}

export const PLAYER_TRANSITIONS: PlayerTransitionsType = {
	idle: {
		play: 'playing',
	},
	playing: {
		pause: 'paused',
		stop: 'idle',
		clear: 'playing',
		snap: 'playing',
	},
	paused: {
		play: 'playing',
		stop: 'idle',
		clear: 'paused',
		snap: 'paused',
	},
}
