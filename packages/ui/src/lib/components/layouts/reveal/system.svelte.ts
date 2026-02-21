import type {
	ExpandProps,
	FuzzyEvent,
	FuzzyPayload,
	FuzzySystem,
	UiState,
} from '$types'

/**
 * Manage the combined state of more than one reveal component
 * WHen mode = 'radio', reveal components are mutually exclusive in their expanded state
 * - when on component expands, all other components should collapse
 * - "clickOutside" will only work if JS is enabled
 * - This class can be used to manage a "clickOutside" equivalent if JS is disabled
 */
class RevealSystem implements FuzzySystem<ExpandProps> {
	mode = 'radio'
	state: Map<string, FuzzyPayload> = $state(new Map())

	public reset() {
		this.state = new Map()
		this.mode = 'radio'
	}

	public init({mode, items}: {mode?: string; items: ExpandProps[]}) {
		if (mode) {
			this.mode = mode
		}

		if (items.length > 0) {
			this.state = this.buildStates(items)
		}
	}

	/**
	 * Helper function to set up initial state for a toggle menu
	 * @param items a list of toggle props
	 * @returns a map of toggle menu items states
	 */
	buildStates(items: ExpandProps[]): Map<string, FuzzyPayload> {
		return new Map(items.map((item: ExpandProps) => [item.id, item]))
	}

	public getControlId(id: string) {
		return `button-reveal-${id}`
	}

	public getContentId(id: string) {
		return `content-reveal-${id}`
	}

	public getControlIdFromContentId(id: string) {
		const baseId = id.replace('content-reveal-', '')
		return `button-reveal-${baseId}`
	}

	public getContentIdFromControlId(id: string) {
		const baseId = id.replace('button-reveal-', '')
		return `content-reveal-${baseId}`
	}

	public setStateItem(item: FuzzyPayload): void {
		this.state.set(item.id, item)
	}

	public deleteStateItem(id: string): void {
		this.state.delete(id)
	}

	public getStateItem(id: string): FuzzyPayload | undefined {
		return this.state.get(id)
	}

	public getState(id: string): string | undefined {
		const state = this.state.get(id)?.state
		return state ? String(state) : undefined
	}

	public setState(payload: FuzzyPayload): void {
		const toUpdate = this.getStateItem(payload.id)
		if (!toUpdate) {
			return
		}

		this.state.set(toUpdate.id, payload)
	}

	public update(payload: FuzzyPayload): void {
		if (payload && payload.action && payload.event) {
			payload.action(payload.event)
			this.setState(payload)

			if (this.mode === 'radio' && payload.state === 'expanded') {
				this.state.forEach((value, key) => {
					if (key !== payload.id && value.state === 'expanded') {
						const updated = {
							id: key,
							name: key,
							event: 'collapse' as FuzzyEvent,
							state: 'collapsed' as UiState,
							value: value.value,
							action: value?.action,
						}
						this.setState(updated)
					}
				})
			}
		}
	}
}

const system = new RevealSystem()

export default system
