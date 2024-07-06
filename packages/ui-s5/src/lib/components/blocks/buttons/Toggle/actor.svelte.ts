import {UiState, type UiBlockProps} from '$types/index.js'
import type {ButtonEvent} from '../button.types.js'
import {type FuzzyPayload} from '$types/machines.js'
import {
	type ToggleMachine,
	type UiStateToggle,
	TOGGLE_MACHINE,
	TOGGLE_TRANSITIONS,
} from './toggle.types.js'

class ToggleActor {
	state = $state(UiState.inactive)
	machine: ToggleMachine = $state(TOGGLE_MACHINE)
	transitions = TOGGLE_TRANSITIONS
	currentState = $derived(this.machine[this.state as UiStateToggle])

	constructor() {}

	public init({
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

	public getState(): UiState {
		return this.state as UiState
	}

	public isPressed(): boolean {
		return this.state === UiState.active
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
