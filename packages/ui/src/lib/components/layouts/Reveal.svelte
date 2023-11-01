<script lang="ts">
	import format from '$lib/utils/format'
	import {clickOutside} from '$lib/utils/click-outside.js'

	export let layout = ''
	export let container = 'layer card'
	export let direction = 'tb-lr'
	export let color = ''
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let align = ''
	export let id = 'ui'
	export let height = ''
	export let background = ''
	export let title = 'Reveal'
	export let asset = ''

	let expanded = false

	function handleClickOutside(event) {
		expanded = false
	}

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: show = expanded ? `layer bg:${background} show` : 'hide:viz-only'
	$: setHeight = height ? ` h:${height}` : ''
</script>

<div
	class={`l:reveal ${setHeight} l:${layout} bp:${breakpoint} ${size} ${direction}`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		id={`${id}-reveal-button`}
		class={`card:${size} ${variant} ${color}`}
		aria-expanded={expanded}
		aria-controls={`${id}-reveal`}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, asset)}
	</button>
	<div id={`${id}-reveal`} class={`align:${align} ${show}`}>
		<slot name="content">
			<div class={`${container}:${size}`}>
				<h3>Revealed Content</h3>
				<p>This is a card with some content</p>
			</div>
		</slot>
	</div>
</div>
