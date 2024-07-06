import type {ButtonEvent} from '../button.types.js'
import {type FuzzyPayload} from '$types/machines.js'
import {UiState, type UiBlockProps} from '$types/index.js'
import {
	type SwitchMachine,
	type UiStateSwitch,
	SWITCH_MACHINE,
	SWITCH_TRANSITIONS,
} from './switch.types.js'

class SwitchActor {
	state = $state(UiState.inactive)
	machine: SwitchMachine = $state(SWITCH_MACHINE)
	transitions = SWITCH_TRANSITIONS
	currentState = $derived(this.machine[this.state as UiStateSwitch])

	constructor() {}

	public init({
		initial,
		onclick,
		machine,
	}: {
		initial?: string
		onclick?: (payload: FuzzyPayload) => void
		machine?: SwitchMachine
	}) {
		if (initial) this.state = initial
		if (machine) this.machine = machine
		this.machine.active.action = onclick
		this.machine.inactive.action = onclick
	}

	public getState(): UiState {
		return this.state as UiState
	}

	public getId(): string {
		return this.currentState.id
	}

	public getValue(): string | number | undefined {
		return this.currentState.value
	}

	public isPressed(): boolean {
		return this.state === UiState.active
	}

	public getLabel(): string | undefined {
		return this.currentState.text
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
		let shapeClass = shape ? ` shape:${shape}` : ''
		let alignClass = align ? `align:${align}` : ''
		let justifyClass = justify ? `justify:${justify}` : ''

		let elementClasses = `${colorClass} ${sizeClass} ${shapeClass} ${alignClass} ${justifyClass} ${fontClass}`
		let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`

		/* Context styles */
		let containerClasses = ''
		if (container) {
			containerClasses = dimensions
				? `l:${container}:${dimensions}`
				: `l:${container}:${size}`
		}
		/* State dependent styles */
		let currentVariant = $derived(this.currentState.variant ?? variant)
		let variantClass = $derived(
			currentVariant ? `variant:${currentVariant}` : '',
		)
		let currentAsset = $derived(this.currentState.asset ?? asset)
		let assetClass = $derived(currentAsset ? `emoji:${currentAsset}` : '')
		let stateClasses = $derived(`${assetClass} ${variantClass}`)

		return `switch ${containerClasses} ${layoutClasses} ${elementClasses} ${stateClasses}`
	}
}

export default SwitchActor
