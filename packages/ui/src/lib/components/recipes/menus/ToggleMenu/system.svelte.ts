import type {ToggleProps, FuzzyPayload, FuzzySystem} from '$types'

class ToggleSystem implements FuzzySystem<ToggleProps> {
	mode = 'radio'
	state: Map<string, FuzzyPayload> = $state(new Map())
	groups: Map<string, Map<string, FuzzyPayload>> = $state(new Map())
	public reset() {
		this.state = new Map()
		this.groups = new Map()
		this.mode = 'radio'
	}

	public init({mode, items}: {mode?: string; items: ToggleProps[]}) {
		if (mode) {
			this.mode = mode
		}

		const gridMenuItems = items?.reduce(this.buildGroups, new Map())

		this.groups = new Map(
			Array.from(gridMenuItems.entries()).map(([group, items]) => {
				const states = this.buildStates(items)
				return [group, states]
			}),
		)

		if (items.length > 0) {
			this.state = this.buildStates(items)
		}
	}

	/**
	 * Helper function to build a suite of toggle menus by reducing them from a list of toggle props
	 * @param groups accumulator for toggle menu groups
	 * @param toggleProps current toggle prop to process
	 * @returns a Map of toggle groups
	 */
	buildGroups(
		groups: Map<string, ToggleProps[]>,
		toggleProps: ToggleProps,
	): Map<string, ToggleProps[]> {
		const {id, label, group} = toggleProps
		const groupLabel = group ? String(group) : 'default'

		let groupItems = groups.get(groupLabel)
		if (!groupItems) {
			groupItems = []
		}

		groupItems.push({
			id,
			label,
			name: id,
			group: groupLabel,
			title: '',
			value: id,
		})

		groups.set(groupLabel, groupItems)
		return groups
	}

	/**
	 * Helper function to set up initial state for a toggle menu
	 * @param items a list of toggle props
	 * @returns a map of toggle menu items states
	 */
	buildStates(items: ToggleProps[]): Map<string, FuzzyPayload> {
		return new Map(
			items.map((item: ToggleProps) => [
				item.id,
				{...item, state: item.initial || 'inactive'},
			]),
		)
	}

	public getState(): FuzzyPayload[] {
		const selected: FuzzyPayload[] = []
		this.state.forEach((item) => {
			if (item.state === 'active') {
				selected.push(item)
			}
		})

		return selected
	}

	public setState(payload: FuzzyPayload): void {
		const itemToUpdate = this.state.get(payload.id)

		if (!itemToUpdate) {
			return
		}

		this.state.set(payload.id, payload as ToggleProps)
	}

	public update(payload: FuzzyPayload): void {
		if (payload && payload.action) {
			this.setState(payload)

			if (this.mode === 'radio' && payload.state === 'active') {
				this.state.forEach((value, key) => {
					if (
						key !== payload.name &&
						value.state === 'active' &&
						value.action
					) {
						value.action('toggle')
						value.state = 'inactive'
						this.setState(value)
					}
				})
			}
		}
	}
}

export default ToggleSystem
