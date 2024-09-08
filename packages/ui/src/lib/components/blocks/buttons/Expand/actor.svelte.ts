import type {
	ButtonEvent,
	UiBlockProps,
	UiStateExpand,
	ExpandMachine,
	FuzzyActor,
	FuzzyPayload,
} from '$types'
import {UiState} from '$types'
import {EXPAND_MACHINE, EXPAND_TRANSITIONS} from './definitions.js'
import styleHelper from '$lib/utils/styles.js'

class ExpandActor implements FuzzyActor {
	state: UiStateExpand = $state(UiState.collapsed)
	machine = $state(EXPAND_MACHINE)
	transitions = EXPAND_TRANSITIONS
	currentState = $derived(this.machine[this.state])
	expanded = $derived(this.state === UiState.expanded)
	value = $derived(this.currentState?.value || this.state)
	id = $derived(this.currentState?.id)
	label = $derived(this.currentState?.label || '')

	constructor({
		initial,
		onclick,
		machine,
	}: {
		initial?: string
		onclick?: (payload: FuzzyPayload) => void
		machine?: ExpandMachine
	}) {
		if (initial) this.state = initial as UiStateExpand
		if (machine) this.machine = machine
		if (onclick) {
			this.machine.expanded.action = onclick
			this.machine.collapsed.action = onclick
		}
	}

	getTransition(event: ButtonEvent): UiStateExpand {
		const state = this.state as UiStateExpand
		const transition = this.transitions[state][event]
		if (transition) {
			return transition as UiStateExpand
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

		return `expand ${blockClasses}`
	}
}

export default ExpandActor
