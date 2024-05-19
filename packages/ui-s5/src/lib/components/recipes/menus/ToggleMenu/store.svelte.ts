import {type ButtonEventType} from '$types/index.js'
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
				{...item, pressed: item.initial === 'active'},
			]),
		)
	}

	public getSelected(): {
		name: string
		value: string | number
		pressed: boolean
	}[] {
		let selected: {
			name: string
			value: string | number
			pressed: boolean
		}[] = []
		this.items.forEach(({value, name, pressed}, key) => {
			if (pressed) {
				selected.push({value: value ?? name, name, pressed})
			}
		})
		console.log('selected', selected)

		return selected
	}

	public update(payload: TogglePayload): void {
		if (payload && payload.update) {
			this.items.set(payload.id, payload)
			console.log('payload', payload)
			if (this.mode === 'radio' && payload.pressed) {
				this.items.forEach((value, key) => {
					if (key !== payload.id && value.pressed && value.update) {
						value.update('toggle' as ButtonEventType)
						value.pressed = false
						this.items.set(key, value)
					}
				})
			}
		}
	}
}

export default ToggleMenuStore
