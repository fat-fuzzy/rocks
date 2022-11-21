import {browser} from '$app/environment'
/**
 * Source:
 * https://svelte.dev/repl/459e136de31f4769ad6fea8f32b30557?version=3.16.7
 *
 *  Dispatch event on click outside of node
 */
export function clickOutside(node) {
	if (!browser) {
		return
	}
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node))
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		},
	}
}
