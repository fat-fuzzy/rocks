import type {
	Filters,
	SketchStateType,
	SketchActionsType,
	SketchTransitionsType,
	SketchFeedbackType,
	SketchEventType,
} from '$types'

import {PLAYER_TRANSITIONS} from '$lib/components/player/definitions.js'

export const DEFAULT_FILTERS: Filters = {
	channels: ['rgba'],
	blur: [0],
	convolutions: ['normal'],
}

export const SKETCH_FEEDBACK: SketchFeedbackType = {
	sketch: [],
	canvas: [],
	player: [],
	controls: [],
}

export const SKETCH_EVENTS: SketchEventType = {
	previous: '',
	current: '',
}

export const SKETCH_STATE: SketchStateType = {
	sketch: 'idle',
	canvas: 'idle',
	player: 'idle',
	controls: 'hidden',
}

export const SKETCH_ACTIONS: SketchActionsType = {
	sketch: {
		idle: ['load'],
		active: ['exit'],
	},
	canvas: {
		idle: ['play'],
		playing: ['pause', 'clear', 'stop'],
		paused: ['play', 'clear', 'stop'],
		stopped: ['play'],
	},
	player: {
		idle: ['play'],
		playing: ['pause', 'stop', 'clear', 'snap'],
		paused: ['play', 'stop', 'clear', 'snap'],
		stopped: ['play'],
	},
	controls: {
		pristine: ['update'],
		updated: ['update'],
	},
}

export const SKETCH_TRANSITIONS: SketchTransitionsType = {
	sketch: {
		idle: {
			load: 'loading',
		},
		loading: {
			loadOk: 'active',
			loadNok: 'error',
		},
		active: {
			stop: 'idle',
			exitNok: 'error',
		},
	},
	canvas: {
		idle: {
			play: 'playing',
			loadNok: 'error',
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
	},
	controls: {
		pristine: {
			update: 'updated',
			stop: 'hidden',
			pause: 'pristine',
		},
		updated: {
			clear: 'pristine',
			stop: 'hidden',
			pause: 'updated',
		},
		hidden: {
			play: 'pristine',
		},
	},
	player: PLAYER_TRANSITIONS,
}
