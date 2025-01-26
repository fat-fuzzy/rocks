import type {ButtonEvent, ToggleProps, FuzzyPayload, FuzzySystem} from '$types'
import {UiState} from '$types'

class ToggleMenuActor implements FuzzySystem {
	state: Map<string, FuzzyPayload> = $state(new Map())
	mode = 'radio'

	public init({mode, items}: {mode: string; items: ToggleProps[]}) {
		if (mode) {
			this.mode = mode
		}
		this.state = new Map(
			items.map((item) => [
				item.id,
				{...item, state: item.initial || UiState.inactive},
			]),
		)
	}

	public getSelected(): {
		name: string
		value?: string | number
		state: string
	}[] {
		let selected: {
			name: string
			value?: string | number
			state: string
		}[] = []
		this.state.forEach((item) => {
			if (item.state === 'active') {
				selected.push(item)
			}
		})

		return selected
	}

	public update(payload: FuzzyPayload): void {
		if (payload && payload.action) {
			this.state.set(payload.name, payload)
			if (this.mode === 'radio' && payload.state === 'active') {
				this.state.forEach((value, key) => {
					if (
						key !== payload.name &&
						value.state === 'active' &&
						value.action
					) {
						value.action('toggle' as ButtonEvent)
						value.state = 'inactive'
						this.state.set(key, value)
					}
				})
			}
		}
	}
}

export default ToggleMenuActor
