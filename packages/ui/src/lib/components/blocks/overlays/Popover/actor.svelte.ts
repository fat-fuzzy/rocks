import type {UiState} from '$types'

type PopoverState = {id: string; element: HTMLElement; state?: UiState}

export class PopoverActor {
	public popovers: PopoverState[] = $state([])

	constructor() {}

	reset() {
		this.popovers = []
	}

	public addPopover(popover: {
		id: string
		element: HTMLElement
		state?: UiState
	}): void {
		const popoverExists = this.popovers.find((p) => p.id === popover.id)
		if (popoverExists) {
			return
		}

		this.popovers.push(popover)
	}

	public getPopoverState(id: string): UiState | undefined {
		const popover = this.popovers.find((popover) => popover.id === id)

		return popover?.state
	}

	public removePopover(id: string): void {
		this.popovers = this.popovers.filter((popover) => popover.id !== id)
	}

	public updatePopoverState(id: string, state: UiState): void {
		const popover = this.popovers.find((popover) => popover.id === id)
		if (!popover) {
			return
		}

		popover.state = state
	}

	public hidePopover(id: string): void {
		const popover = this.popovers.find((popover) => popover.id === id)
		if (!popover) {
			return
		}

		popover.element.hidePopover()
		this.updatePopoverState(id, 'collapsed')
	}

	public showPopover(id: string): void {
		const popover = this.popovers.find((popover) => popover.id === id)
		if (!popover) {
			return
		}
		popover.state = 'expanded'
		popover.element.showPopover()
	}
}

const actor = new PopoverActor()

export default actor
