/**
 * Source:
 * https://svelte.dev/repl/459e136de31f4769ad6fea8f32b30557?version=3.16.7
 *
 *  Dispatch event on click outside of node
 */

export function clickOutside(node: any) {
	const handleClick = (event: Event) => {
		const target = event.target as HTMLElement
		if (node && !node.contains(target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside', node))
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		},
	}
}
