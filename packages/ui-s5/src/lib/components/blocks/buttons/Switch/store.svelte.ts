import type {UiState, ButtonEventType} from '$types/index.js'
import type {TogglePayload} from '../button.types.js'

import {
	type SwitchStateType,
	type SwitchType,
	SWITCH,
	SWITCH_TRANSITIONS,
} from './types.js'
class SwitchStore {
	state = $state('inactive')
	switchStates: SwitchStateType = $state(SWITCH)
	transitions = SWITCH_TRANSITIONS

	public init({
		initial,
		onclick,
		switchStates,
	}: {
		initial?: UiState
		onclick?: (payload: TogglePayload) => void
		switchStates: SwitchStateType
	}) {
		this.state = initial ?? 'inactive'
		this.switchStates = switchStates
		this.switchStates.active.onclick = onclick
		this.switchStates.inactive.onclick = onclick
	}

	public getState(): UiState {
		return this.state as UiState
	}

	public getSwitchState(): SwitchType {
		return this.switchStates[this.state as UiState]
	}

	public getId(): string {
		return this.switchStates[this.state as UiState].id
	}

	public getValue(): string {
		return this.switchStates[this.state as UiState].value
	}

	public isPressed(): boolean {
		return this.state === 'active'
	}

	public getLabel(): string | undefined {
		return this.switchStates[this.state as UiState].text
	}

	public getTransition(event: ButtonEventType): UiState {
		const state = this.state as UiState
		const transition = this.transitions[state][event]
		if (transition) {
			return transition as UiState
		}
		return state
	}

	public update(event: ButtonEventType): void {
		this.state = this.getTransition(event)
	}
}

const switchStore = new SwitchStore()

export default switchStore
