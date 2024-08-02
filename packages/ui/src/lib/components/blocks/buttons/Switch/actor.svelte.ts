import type {
	ButtonEvent,
	FuzzyPayload,
	FuzzyActor,
	UiBlockProps,
	UiStateSwitch,
	SwitchMachine,
} from '$types'
import {SWITCH_MACHINE, SWITCH_TRANSITIONS} from './definitions.js'
import {UiState} from '$types'
import styleHelper from '$lib/utils/styles.js'

class SwitchActor implements FuzzyActor {
	state: UiStateSwitch = $state(UiState.inactive)
	machine = $state(SWITCH_MACHINE)
	transitions = SWITCH_TRANSITIONS
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
		machine?: SwitchMachine
	}) {
		if (initial) this.state = initial as UiStateSwitch
		if (machine) this.machine = machine
		if (onclick) {
			this.machine.active.action = onclick
			this.machine.inactive.action = onclick
		}
	}

	public getTransition(event: ButtonEvent): UiStateSwitch {
		const state = this.state
		const transition = this.transitions[state][event]
		if (transition) {
			return transition as UiStateSwitch
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

		return `switch ${blockClasses}`
	}
}

export default SwitchActor
