/**
 *  Dispatch event on click outside of node
 */
export function clickOutside(
	node: HTMLElement,
	callback: (args?: any) => void,
) {
	const handleClick = (event: Event) => {
		let target = event.target as HTMLElement
		if (node && !node.contains(target) && !event.defaultPrevented) {
			callback()
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		},
	}
}
