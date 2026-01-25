import {EventOrder} from '$types'
import type {PlayerEvent, PlayerState, PlayerAction} from '$types'
import type {UiColor, UiSize, UiVariant, FuzzyPayload} from '@fat-fuzzy/ui'

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

export type PlayerSwitchState = {
	id: string
	value: string | number
	text: string
	asset: string
	variant: string
	state: string
	onclick?: (payload: FuzzyPayload) => void
}

export type PlayerProps = {
	id?: string
	font?: UiSize
	size: UiSize
	variant?: UiVariant

	color?: UiColor
	disabled?: boolean
	initial?: string
	canvas?: HTMLCanvasElement

	play: (payload: {event: PlayerEvent}) => void
	pause: (payload: {event: PlayerEvent}) => void
	clear: (payload: {event: PlayerEvent}) => void
	stop: (payload: {event: PlayerEvent}) => void
	init?: (payload: {event: PlayerEvent}) => void
	snap?: () => void
}
