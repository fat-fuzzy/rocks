import type {ToggleProps, FuzzyPayload, FuzzySystem} from '$types'

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
				const states = this.buildStates(items)
				return [group, states]
			}),
		)

		this.state = this.buildStates(items)
	}

	buildStates(items: ToggleProps[]): Map<string, FuzzyPayload> {
		return new Map(
			items.map((item: ToggleProps) => [
				item.id,
				{...item, state: item.initial || 'inactive'},
			]),
		)
	}

	public getSelected(): FuzzyPayload[] {
		let selected: FuzzyPayload[] = []
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
						value.action('toggle')
						value.state = 'inactive'
						this.state.set(key, value)
					}
				})
			}
		}
	}
}

export default ToggleMenuActor
