import {UiState, type UiBlockProps} from '$types/index.js'
import styleHelper from '$lib/utils/styles.js'
import type {ButtonEvent} from '../button.types.js'
import {type FuzzyPayload, type FuzzyActor} from '$types/machines.js'
import {
	type UiStateToggle,
	type ToggleMachine,
	TOGGLE_MACHINE,
	TOGGLE_TRANSITIONS,
} from './toggle.types.js'

class ToggleActor implements FuzzyActor {
	state: UiStateToggle = $state(UiState.inactive)
	machine: ToggleMachine = $state(TOGGLE_MACHINE)
	transitions = TOGGLE_TRANSITIONS
	currentState = $derived(this.machine[this.state])
	pressed = $derived(this.state === UiState.active)
	value = $derived(this.currentState?.value || this.state)
	id = $derived(this.currentState?.id)
	text = $derived(this.currentState?.text || '')

	constructor({
		initial,
		onclick,
		machine,
	}: {
		initial?: string
		onclick?: (payload: FuzzyPayload) => void
		machine?: ToggleMachine
	}) {
		if (initial) this.state = initial as UiStateToggle
		if (machine) this.machine = machine
		if (onclick) {
			this.machine.active.action = onclick
			this.machine.inactive.action = onclick
		}
	}

	public getTransition(event: ButtonEvent): UiStateToggle {
		const state = this.state
		const transition = this.transitions[state][event]
		if (transition) {
			return transition as UiStateToggle
		}
		return state
	}

	public update(event: ButtonEvent): void {
		this.state = this.getTransition(event)
	}

	public getStyles(props: UiBlockProps): string {
		let currentVariant = this.currentState?.variant ?? props.variant
		let currentAsset = this.currentState?.asset ?? props.asset

		let blockClasses = styleHelper.getStyles({
			...props,
			asset: currentAsset,
			variant: currentVariant,
		})

		return `toggle ${blockClasses}`
	}
}

export default ToggleActor
