import type {ExpandProps, FuzzyPayload, FuzzySystem} from '$types'
import {UiState, ButtonEvent} from '$types'

class RevealActor implements FuzzySystem {
	state: Map<string, ExpandProps> = $state(new Map())
	mode = 'radio'

	public init({mode, items}: {mode: string; items: ExpandProps[]}) {
		if (mode) {
			this.mode = mode
		}

		if (items.length > 0) {
			this.state = new Map(
				items.map((item) => [
					item.id,
					{...item, state: item.initial || UiState.collapsed},
				]),
			)
		}
	}

	public addRevealItem(id: string, item: ExpandProps): void {
		this.state.set(id, item)
	}

	public removeRevealItem(id: string): void {
		this.state.delete(id)
	}

	public getRevealState(id: string): string | undefined {
		return this.state.get(id)?.state
	}

	public toggleReveal(payload: FuzzyPayload): void {
		let itemToReval = this.state.get(payload.id)
		if (itemToReval) {
			if (itemToReval.action) itemToReval.action(itemToReval.event)
			this.state.set(payload.id, itemToReval)
		}
	}

	public update(payload: FuzzyPayload): void {
		if (payload && payload.action) {
			this.state.set(payload.name, payload)
			if (this.mode === 'radio' && payload.state === UiState.expanded) {
				this.state.forEach((value, key) => {
					if (
						key !== payload.name &&
						value.state === UiState.expanded &&
						value.action
					) {
						value.action(ButtonEvent.collapse)
						this.state.set(key, value)
					}
				})
			}
		}
	}
}

export default RevealActor
