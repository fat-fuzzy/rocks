import {UiState, type ButtonEventType} from '$types/index.js'
import type {ToggleState, TogglePayload} from './toggle.types.js'
import {
	type ToggleStateType,
	TOGGLE,
	TOGGLE_TRANSITIONS,
} from './toggle.types.js'

class ToggleStore {
	state = $state(UiState.inactive)
	toggleStates: ToggleStateType = $state(TOGGLE)
	transitions = TOGGLE_TRANSITIONS

	public init({
		initial,
		onclick,
	}: {
		initial?: string
		onclick?: (payload: TogglePayload) => void
	}) {
		this.state = (initial as UiState) ?? UiState.inactive
		this.toggleStates.active.onclick = onclick
		this.toggleStates.inactive.onclick = onclick
	}

	public getState(): ToggleState {
		return this.state as ToggleState
	}

	public getValue(): string | number {
		return this.toggleStates[this.state as ToggleState].value
	}

	public isPressed(): boolean {
		return this.state === 'active'
	}

	public getTransition(event: ButtonEventType): ToggleState {
		const state = this.state as ToggleState
		const transition = this.transitions[state][event]
		if (transition) {
			return transition as ToggleState
		}
		return state
	}

	public update(event: ButtonEventType): void {
		this.state = this.getTransition(event)
	}
}

export default ToggleStore
