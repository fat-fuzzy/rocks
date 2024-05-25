import {UiState, type ButtonEventType} from '$types/index.js'

import {
	type ExpandState,
	type ExpandStateType,
	type ExpandType,
	type ExpandPayload,
	EXPAND,
	EXPAND_TRANSITIONS,
} from './expand.types.js'
class ExpandStore {
	state = $state(UiState.collapsed)
	expandStates: ExpandStateType = $state(EXPAND)
	transitions = EXPAND_TRANSITIONS

	public init({
		initial,
		onclick,
		expandStates,
	}: {
		initial?: UiState
		onclick?: (payload: ExpandPayload) => void
		expandStates: ExpandStateType
	}) {
		this.state = initial ?? UiState.collapsed
		this.expandStates = expandStates ?? EXPAND
		this.expandStates.expanded.onclick = onclick
		this.expandStates.collapsed.onclick = onclick
	}

	public getState(): ExpandState {
		return this.state as ExpandState
	}

	public getExpandState(): ExpandType {
		return this.expandStates[this.state as ExpandState]
	}

	public getId(): string {
		return this.expandStates[this.state as ExpandState].id
	}

	public getValue(): string {
		return this.expandStates[this.state as ExpandState].value
	}

	public isExpanded(): boolean {
		return this.state === 'expanded'
	}

	public getLabel(): string | undefined {
		return this.expandStates[this.state as ExpandState].text
	}

	public getTransition(event: ButtonEventType): ExpandState {
		const state = this.state as ExpandState
		const transition = this.transitions[state][event]
		if (transition) {
			return transition as ExpandState
		}
		return state
	}

	public update(event: ButtonEventType): void {
		this.state = this.getTransition(event)
	}
}

export default ExpandStore
