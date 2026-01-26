export class PopoverActor {
	public popovers: {id: string; element: HTMLElement; state: string}[] = $state(
		[],
	)

	constructor() {}

	reset() {
		this.popovers = []
	}

	public addPopover(popover: {
		id: string
		element: HTMLElement
		state: string
	}): void {
		this.popovers.push(popover)
	}

	public isActive(id: string): boolean {
		const popover = this.popovers.find((popover) => popover.id === id)
		if (!popover) {
			return false
		}

		return popover.state === 'expanded'
	}

	public removePopover(id: string): void {
		this.popovers = this.popovers.filter((popover) => popover.id !== id)
	}
}

const actor = new PopoverActor()

export default actor
