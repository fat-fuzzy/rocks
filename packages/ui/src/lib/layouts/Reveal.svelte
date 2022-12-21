<script lang="ts">
	import {clickOutside} from '../utils/click-outside.js'

	export let layout = 'stack'
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let alignment = 'start'
	let expanded = false

	function toggleReveal(event) {
		expanded = !expanded
	}

	function handleClickOutside(event) {
		expanded = false
	}

	$: show = expanded ? 'show' : 'hide'
</script>

<div
	class={`l-reveal l-${layout} ${size} ${breakpoint}`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<slot name="toggle">
		<button
			type="button"
			class={`toggle collapse ${size} ${variant}`}
			aria-expanded={expanded}
			on:click={toggleReveal}
		>
			Click to Reveal
		</button>
	</slot>
	<div class={`${alignment} ${show}`}>
		<slot name="content">
			<div class={`l-${layout} ${size} card layer`}>
				<h4>Revealed Content</h4>
				<p>This is a card with some content</p>
			</div>
		</slot>
	</div>
</div>
