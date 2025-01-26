import type {ButtonEvent, UiBlockProps, FuzzyActor, FuzzyPayload} from '$types'

import type {UiStateDnd, DndMachine} from './dnd.d.ts' // TODO: move to types

import {UiState} from '$types'
import {DND_MACHINE, DND_TRANSITIONS} from './definitions.js'
import styleHelper from '$lib/utils/styles.js'

class DndActor implements FuzzyActor {
	state: UiStateDnd = $state(UiState.inactive)
	machine = $state(DND_MACHINE)
	transitions = DND_TRANSITIONS
	currentState = $derived(this.machine[this.state])
	hovering = $derived(this.state === UiState.hovering)
	value = $derived(this.currentState?.value || this.state)
	id = $derived(this.currentState?.id)
	label = $derived(this.currentState?.label || '')

	constructor({
		initial,
		ondragstart,
		ondrag,
		ondragend,
		machine,
	}: {
		initial?: string
		ondragstart?: (payload: FuzzyPayload) => void
		ondrag?: (payload: FuzzyPayload) => void
		ondragend?: (payload: FuzzyPayload) => void
		machine?: DndMachine
	}) {
		if (initial) this.state = initial as UiStateDnd
		if (machine) this.machine = machine
		if (ondragstart) {
			this.machine.inactive.action = ondragstart
		}
		if (ondrag) {
			this.machine.active.action = ondrag
		}
		if (ondragend) {
			this.machine.hovering.action = ondragend
		}
	}

	getTransition(event: ButtonEvent): UiStateDnd {
		const state = this.state as UiStateDnd
		const transition = this.transitions[state][event]
		if (transition) {
			return transition as UiStateDnd
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

		return `dnd ${blockClasses}`
	}
}

export default DndActor
