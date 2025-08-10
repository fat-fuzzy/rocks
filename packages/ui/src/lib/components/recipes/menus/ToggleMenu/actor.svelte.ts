import type {ToggleProps, FuzzyPayload, FuzzySystem} from '$types'
import {UiState, ButtonEvent} from '$types'

class ToggleMenuActor implements FuzzySystem {
	state: Map<string, FuzzyPayload> = $state(new Map())
	groups: Map<string, Map<string, FuzzyPayload>> = $state(new Map())
	mode = 'radio'

	public init({mode, items}: {mode: string; items: ToggleProps[]}) {
		if (mode) {
			this.mode = mode
		}

		const gridMenuItems = items?.reduce(
			(groups: Map<string, ToggleProps[]>, {id, label, group}) => {
				let groupLabel = String(group)
				if (!groupLabel) {
					groupLabel = 'default'
				}

				let groupItems = groups.get(groupLabel)
				if (!groupItems) {
					groupItems = []
				}
				groupItems.push({
					id,
					label,
					name: id,
					group: id,
					title: '',
					value: id,
				})

				groups.set(groupLabel, groupItems)
				return groups
			},
			new Map(),
		)

		this.groups = new Map(
			Array.from(gridMenuItems.entries()).map(([group, items]) => {
				const states = items.map((item: ToggleProps) => [
					item.id,
					{...item, state: item.initial || UiState.inactive},
				])
				return [group, states]
			}),
		)

		this.state = new Map(
			items.map((item) => [
				item.id,
				{...item, state: item.initial || UiState.inactive},
			]),
		)
	}

	public getSelected(): FuzzyPayload[] {
		let selected: FuzzyPayload[] = []
		this.state.forEach((item) => {
			if (item.state === UiState.active) {
				selected.push(item)
			}
		})

		return selected
	}

	public update(payload: FuzzyPayload): void {
		if (payload && payload.action) {
			this.state.set(payload.name, payload)
			if (this.mode === 'radio' && payload.state === UiState.active) {
				this.state.forEach((value, key) => {
					if (
						key !== payload.name &&
						value.state === UiState.active &&
						value.action
					) {
						value.action(ButtonEvent.toggle)
						value.state = UiState.inactive
						this.state.set(key, value)
					}
				})
			}
		}
	}
}

export default ToggleMenuActor
