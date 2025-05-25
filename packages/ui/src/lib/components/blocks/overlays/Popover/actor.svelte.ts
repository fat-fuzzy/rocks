import {UiState} from '$types'

export class PopoverActor {
	public popovers: {id: string; element: HTMLElement; state: UiState}[] =
		$state([])

	constructor() {}

	public addPopover(popover: {
		id: string
		element: HTMLElement
		state: UiState
	}): void {
		this.popovers.push(popover)
	}

	public isActive(id: string): boolean {
		const popover = this.popovers.find((popover) => popover.id === id)
		if (!popover) {
			return false
		}

		return popover.state === UiState.active
	}

	public removePopover(id: string): void {
		this.popovers = this.popovers.filter((popover) => popover.id !== id)
	}

	public hidePopover(id: string): void {
		const popover = this.popovers.find((popover) => popover.id === id)
		if (!popover) {
			return
		}

		popover.state === UiState.inactive
		popover.element.hidePopover()
	}

	public showPopover(id: string): void {
		const popover = this.popovers.find((popover) => popover.id === id)
		if (!popover) {
			return
		}
		popover.state === UiState.active
		popover.element.showPopover()
	}
}

const actor = new PopoverActor()

export default actor
