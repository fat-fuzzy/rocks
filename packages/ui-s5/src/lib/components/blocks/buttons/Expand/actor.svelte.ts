import type {ButtonEvent} from '../button.types.js'
import {type FuzzyPayload} from '$types/machines.js'
import {UiState, type UiBlockProps} from '$types/index.js'

import {
	type UiStateExpand,
	type ExpandMachine,
	EXPAND_MACHINE,
	EXPAND_TRANSITIONS,
} from './expand.types.js'

class ExpandActor {
	state = $state(UiState.collapsed)
	machine: ExpandMachine = $state(EXPAND_MACHINE)
	transitions = EXPAND_TRANSITIONS
	currentState = $derived(this.machine[this.state as UiStateExpand])
	expanded = $derived(this.state === UiState.expanded)
	value = $derived(this.machine[this.state as UiStateExpand].value)
	id = $derived(this.machine[this.state as UiStateExpand].id)
	text = $derived(this.machine[this.state as UiStateExpand].text)

	constructor() {}

	public init({
		initial,
		onclick,
		machine,
	}: {
		initial?: string
		onclick?: (payload: FuzzyPayload) => void
		machine?: ExpandMachine
	}) {
		if (initial) this.state = initial
		if (machine) this.machine = machine
		if (onclick) {
			this.machine.expanded.action = onclick
			this.machine.collapsed.action = onclick
		}
	}

	getTransition(event: ButtonEvent): UiState {
		const state = this.state as UiState
		const transition = this.transitions[state][event]
		if (transition) {
			return transition as UiState
		}
		return state
	}

	public update(event: ButtonEvent): void {
		console.log('update event', event)

		this.state = this.getTransition(event)
		console.log('update this.state', this.state)
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

		let currentVariant =
			this.machine[this.state as UiStateExpand].variant ?? variant
		let variantClass = currentVariant ? `variant:${currentVariant}` : ''
		let currentAsset = this.machine[this.state as UiStateExpand].asset ?? asset
		let assetClass = currentAsset ? `emoji:${currentAsset}` : ''
		let elementClasses = `${colorClass} ${sizeClass} ${shapeClass} ${alignClass} ${justifyClass} ${fontClass}`
		let layoutClasses = shapeClass ? `l:stack:${size}` : `l:${layout}`

		/* Context styles */
		let containerClasses = ''
		if (container) {
			containerClasses = dimensions
				? `l:${container}:${dimensions}`
				: `l:${container}:${size}`
		}

		return `expand ${containerClasses} ${layoutClasses} ${elementClasses} ${assetClass} ${variantClass}`
	}
}

export default ExpandActor
