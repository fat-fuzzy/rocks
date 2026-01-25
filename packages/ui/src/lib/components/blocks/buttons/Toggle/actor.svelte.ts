import type {
	ButtonEvent,
	UiBlockProps,
	FuzzyPayload,
	FuzzyActor,
	ToggleMachine,
	UiStateToggle,
	UiVariant,
} from '$types'
import {TOGGLE_MACHINE, TOGGLE_TRANSITIONS} from './definitions'

import styleHelper from '$lib/utils/styles.js'
class ToggleActor implements FuzzyActor {
	state: UiStateToggle = $state('inactive')
	machine = $state(TOGGLE_MACHINE)
	transitions = TOGGLE_TRANSITIONS
	currentState = $derived(this.machine[this.state])
	pressed = $derived(this.state === 'active')
	value = $derived(this.currentState?.value || this.state)
	id = $derived(this.currentState?.id)
	label = $derived(this.currentState?.label)

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
		const currentVariant = this.currentState?.variant ?? props.variant
		const currentAsset = this.currentState?.asset ?? props.asset

		const blockClasses = styleHelper.getStyles({
			...props,
			asset: currentAsset,
			variant: currentVariant as UiVariant,
		})

		return `toggle ${blockClasses}`.trim()
	}
}

export default ToggleActor
