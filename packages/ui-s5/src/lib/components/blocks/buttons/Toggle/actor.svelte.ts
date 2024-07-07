import {UiState, type UiBlockProps} from '$types/index.js'
import type {ButtonEvent} from '../button.types.js'
import {type FuzzyPayload, type FuzzyActor} from '$types/machines.js'
import {
	type ToggleMachine,
	TOGGLE_MACHINE,
	TOGGLE_TRANSITIONS,
} from './toggle.types.js'

class ToggleActor implements FuzzyActor {
	state = $state(UiState.inactive)
	machine: ToggleMachine = $state(TOGGLE_MACHINE)
	transitions = TOGGLE_TRANSITIONS
	currentState = $derived(this.machine[this.state])
	pressed = $derived(this.state === UiState.active)
	value = $derived(this.machine[this.state]?.value)
	id = $derived(this.machine[this.state]?.id)
	text = $derived(this.machine[this.state]?.text)

	constructor({
		initial,
		onclick,
		machine,
	}: {
		initial?: string
		onclick?: (payload: FuzzyPayload) => void
		machine?: ToggleMachine
	}) {
		if (initial) this.state = initial
		if (machine) this.machine = machine
		if (onclick) {
			this.machine.active.action = onclick
			this.machine.inactive.action = onclick
		}
	}

	public getTransition(event: ButtonEvent): UiState {
		const state = this.state as UiState
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
		let {
			color,
			size,
			shape,
			align,
			justify,
			asset,
			variant,
			layout,
			container,
			dimensions,
		} = props

		/* Element styles */
		let colorClass = color ? `bg:${color}` : ''
		let sizeClass = size ? `size:${size}` : ''
		let fontClass = size ? `font:${size}` : ''
		let assetClass = asset ? `emoji:${asset}` : ''
		let variantClass = variant ? `variant:${variant}` : ''
		let shapeClass = shape ? ` shape:${shape}` : ''
		let alignClass = align ? `align:${align}` : ''
		let justifyClass = justify ? `justify:${justify}` : ''

		let elementClasses = `${colorClass} ${sizeClass} ${shapeClass} ${alignClass} ${justifyClass} ${fontClass} ${variantClass} ${assetClass}`
		let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`

		/* Context styles */
		let containerClass = ''
		if (container) {
			containerClass = dimensions
				? `l:${container}:${dimensions}`
				: `l:${container}:${size}`
		}

		return `toggle ${containerClass} ${layoutClasses} ${elementClasses}`
	}
}

export default ToggleActor
