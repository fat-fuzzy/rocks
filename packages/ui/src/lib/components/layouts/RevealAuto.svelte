<script lang="ts">
	import format from '$lib/utils/format'
	import {clickOutside} from '$lib/utils/click-outside.js'

	export let layout = ''
	export let direction = ''
	export let color = ''
	export let size = ''
	export let threshold = ''
	export let variant = ''
	export let align = ''
	export let id = 'ui'
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

	$: layoutClass = layout ? `l:${layout}:${size}` : ''
	$: backgroundClass = background ? `layer bg:${background}` : ''
	$: show = expanded ? `${backgroundClass} show` : 'hide:viz-only'
</script>

<div
	class={`l:reveal:auto l:${layout}:${size} bp:${threshold} ${size}  align-self:${align} align:end `}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		id={`${id}-reveal-button`}
		class={`card:${size} font:${size} ${variant} ${color} outline`}
		aria-expanded={expanded}
		aria-controls={`${id}-reveal`}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, asset)}
	</button>
	<div id={`${id}-reveal`} class={`${layoutClass} ${show} ${direction} shrink`}>
		<slot name="content">
			<div class={`layer card:${size}`}>
				<p class="font:lg">Revealed Content</p>
				<p>This is a card with some content</p>
			</div>
		</slot>
	</div>
</div>
