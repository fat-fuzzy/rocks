import type {
	FuzzyPayload,
	FuzzyActor,
	UiBlockProps,
	UiStateSwitch,
	SwitchMachine,
	UiVariant,
	ButtonEvent,
} from '$types'

import {SWITCH_MACHINE, SWITCH_TRANSITIONS} from './definitions.js'
import styleHelper from '$lib/utils/styles.js'

class SwitchActor implements FuzzyActor {
	state: UiStateSwitch = $state('inactive')
	machine = $state(SWITCH_MACHINE)
	transitions = SWITCH_TRANSITIONS
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
		const state = this.state as UiStateSwitch
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
		const currentVariant = this.currentState?.variant ?? props.variant
		const currentAsset = this.currentState?.asset ?? props.asset

		const blockClasses = styleHelper.getStyles({
			...props,
			asset: currentAsset,
			variant: currentVariant as UiVariant,
		})

		return `switch ${blockClasses}`.trim()
	}
}

export default SwitchActor
