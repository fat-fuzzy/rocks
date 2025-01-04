import {EventOrder} from '$types'

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

export type PlayerPayload = {value: string | number; state: string}

export type PlayerSwitchState = {
	id: string
	value: string | number
	text: string
	asset: string
	variant: string
	state: string
	onclick?: (payload: PlayerPayload) => void
}
