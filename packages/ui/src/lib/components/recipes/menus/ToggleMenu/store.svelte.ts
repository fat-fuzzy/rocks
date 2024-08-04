import type {
	ButtonEvent,
	ToggleProps,
	FuzzyPayload,
	ToggleMenuStateType,
} from '$types'
import {UiState} from '$types'

class ToggleMenuStore {
	mode = 'radio'
	items: ToggleMenuStateType = $state(new Map())

	public init({mode, items}: {mode: string; items: ToggleProps[]}) {
		if (mode) {
			this.mode = mode
		}
		this.items = new Map(
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
		this.items.forEach((item) => {
			if (item.state === 'active') {
				selected.push(item)
			}
		})

		return selected
	}

	public update(payload: FuzzyPayload): void {
		if (payload && payload.callback) {
			this.items.set(payload.name, payload)
			if (this.mode === 'radio' && payload.state === 'active') {
				this.items.forEach((value, key) => {
					if (
						key !== payload.name &&
						value.state === 'active' &&
						value.callback
					) {
						value.callback('toggle' as ButtonEvent)
						value.state = 'inactive'
						this.items.set(key, value)
					}
				})
			}
		}
	}
}

export default ToggleMenuStore
