import {UiState, type ButtonEventType} from '$types/index.js'
import type {
	ToggleProps,
	TogglePayload,
} from '$lib/components/blocks/buttons/Toggle/toggle.types.js'
import {
	type ToggleMenuStateType,
	type SelectionMode,
} from './toggleMenu.types.js'

class ToggleMenuStore {
	mode: SelectionMode = 'radio'
	items: ToggleMenuStateType = $state(new Map())

	public init({mode, items}: {mode: SelectionMode; items: ToggleProps[]}) {
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
		value: string | number
		state: string
	}[] {
		let selected: {
			name: string
			value: string | number
			state: string
		}[] = []
		this.items.forEach((item) => {
			if (item.state === 'active') {
				selected.push(item)
			}
		})

		return selected
	}

	public update(payload: TogglePayload): void {
		if (payload && payload.update) {
			this.items.set(payload.name, payload)
			if (this.mode === 'radio' && payload.state === 'active') {
				this.items.forEach((value, key) => {
					if (
						key !== payload.name &&
						value.state === 'active' &&
						value.update
					) {
						value.update('toggle' as ButtonEventType)
						value.state = 'inactive'
						this.items.set(key, value)
					}
				})
			}
		}
	}
}

export default ToggleMenuStore
