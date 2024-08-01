import type {
	ButtonEvent,
	UiBlockProps,
	FuzzyPayload,
	FuzzyActor,
	ToggleMachine,
	UiStateToggle,
} from '$types'
import {UiState} from '$types'
import {TOGGLE_MACHINE, TOGGLE_TRANSITIONS} from './definitions.js'
import styleHelper from '$lib/utils/styles.js'
class ToggleActor implements FuzzyActor {
	state: UiStateToggle = $state(UiState.inactive)
	machine = $state(TOGGLE_MACHINE)
	transitions = TOGGLE_TRANSITIONS
	// @ts-expect-error TODO: Fix this.state type
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
			return transition as UiState
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
