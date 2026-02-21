/**
 * Source:
 * https://svelte.dev/repl/459e136de31f4769ad6fea8f32b30557?version=3.16.7
 *
 *  Dispatch event on click outside of node
 */

export function clickOutside(
	node: HTMLElement,
	args: {callback: (event: Event) => void; ignore: string[]},
) {
	const handleClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement
		if (args.ignore.includes(target.id)) {
			return
		}

		if (node && !node.contains(target) && !event.defaultPrevented) {
			args.callback(event)
		}
	}

	document.addEventListener('click', handleClick, true)

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true)
		},
	}
}
