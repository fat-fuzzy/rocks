<script lang="ts">
	import format from '$lib/utils/format'
	import {clickOutside} from '$lib/utils/click-outside.js'

	export let layout = 'switcher'
	export let container = 'layer card'
	export let direction = ''
	export let color = ''
	export let size = ''
	export let threshold = ''
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
	class={`l:reveal:auto ${setHeight} l:${layout}:${size} bp:${threshold} ${size}  align-self:${align} align:end `}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		id={`${id}-reveal-button`}
		class={`card:${size} font:${size} ${variant} ${color} outline align-self:end `}
		aria-expanded={expanded}
		aria-controls={`${id}-reveal`}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, asset)}
	</button>
	<div id={`${id}-reveal`} class={`l:${layout}:${size} ${show} ${direction} shrink`}>
		<slot name="content">
			<div class={`${container}:${size}`}>
				<p class="font:lg">Revealed Content</p>
				<p>This is a card with some content</p>
			</div>
		</slot>
	</div>
</div>
