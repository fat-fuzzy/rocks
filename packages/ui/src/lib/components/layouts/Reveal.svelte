<script lang="ts">
	import format from '$lib/utils/format'
	import {clickOutside} from '$lib/utils/click-outside.js'

	export let layout = ''
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let align = 'start'
	export let id = 'ui'
	export let height = ''
	export let title = 'Reveal'
	export let icon = '🐣'

	let expanded = true

	function handleClickOutside(event) {
		expanded = false
	}

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: show = expanded ? 'show' : 'hide:viz-only'
	$: setHeight = height ? ` h:${height}` : ''
</script>

<div
	class={`l:reveal ${setHeight} l:${layout} bp:${breakpoint} ${size}`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		id={`${id}-reveal-button`}
		class={`card:${size} ${variant}`}
		aria-expanded={expanded}
		aria-controls={`${id}-reveal`}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, icon)}
	</button>
	<div id={`${id}-reveal`} class={`align:${align} ${show}`}>
		<slot name="content">
			<div class={`card layer ${size}`}>
				<h3>Revealed Content</h3>
				<p>This is a card with some content</p>
			</div>
		</slot>
	</div>
</div>
