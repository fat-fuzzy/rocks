import type {ExpandProps, FuzzyPayload, FuzzySystem} from '$types'

class RevealActor implements FuzzySystem {
	state: Map<string, ExpandProps> = $state(new Map())
	mode = 'radio'

	public init({mode, items}: {mode?: string; items: ExpandProps[]}) {
		if (mode) {
			this.mode = mode
		}

		if (items.length > 0) {
			this.state = new Map(
				items.map((item) => [
					item.id,
					{...item, state: item.initial || 'collapsed'},
				]),
			)
		}
	}

	public reset() {
		this.state = new Map()
		this.mode = 'radio'
	}

	public addRevealItem(id: string, item: ExpandProps): void {
		this.state.set(id, item)
	}

	public removeRevealItem(id: string): void {
		this.state.delete(id)
	}

	public getRevealState(id: string): string | undefined {
		const state = this.state.get(id)?.value
		return state ? String(state) : undefined
	}

	public toggleReveal(payload: FuzzyPayload): void {
		const itemToReval = this.state.get(payload.id)
		if (itemToReval) {
			this.state.set(payload.id, itemToReval)
		}
	}

	public update(payload: FuzzyPayload): void {
		if (payload && payload.action) {
			const expandProps = this.state.get(payload.name)

			if (expandProps) {
				expandProps.value = payload.value
				this.state.set(payload.name, expandProps)
			}

			if (this.mode === 'radio' && payload.state === 'expanded') {
				this.state.forEach((value, key) => {
					if (
						key !== payload.name &&
						value.value === 'expanded' &&
						value.action
					) {
						value.action('collapse')
						this.state.set(key, value)
					}
				})
			}
		}
	}
}

export default RevealActor
