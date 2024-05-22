import {UiState, type ButtonEventType} from '$types/index.js'
import type {
	ToggleState,
	TogglePayload,
} from '$lib/components/blocks/buttons/Toggle/toggle.types.js'

import {
	type SwitchStateType,
	type SwitchType,
	SWITCH,
	SWITCH_TRANSITIONS,
} from './switch.types.js'
class SwitchStore {
	state = $state(UiState.inactive)
	switchStates: SwitchStateType = $state(SWITCH)
	transitions = SWITCH_TRANSITIONS

	public init({
		initial,
		onclick,
		switchStates,
	}: {
		initial?: string
		onclick?: (payload: TogglePayload) => void
		switchStates: SwitchStateType
	}) {
		this.state = (initial as UiState) ?? UiState.inactive
		this.switchStates = switchStates
		this.switchStates.active.onclick = onclick
		this.switchStates.inactive.onclick = onclick
	}

	public getState(): ToggleState {
		return this.state as ToggleState
	}

	public getSwitchState(): SwitchType {
		return this.switchStates[this.state as ToggleState]
	}

	public getId(): string {
		return this.switchStates[this.state as ToggleState].id
	}

	public getValue(): string | number {
		return this.switchStates[this.state as ToggleState].value
	}

	public isPressed(): boolean {
		return this.state === 'active'
	}

	public getLabel(): string | undefined {
		return this.switchStates[this.state as ToggleState].text
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

export default SwitchStore
