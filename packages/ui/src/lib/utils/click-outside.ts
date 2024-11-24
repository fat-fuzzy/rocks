/**
 *  Dispatch event on click outside of node
 */
export function clickOutside(
	node: HTMLElement,
	callback: (args?: any) => void,
) {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
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
