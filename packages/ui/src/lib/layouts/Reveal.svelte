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
	class={`l-reveal l-${layout} ${size} bp:${breakpoint}`}
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
			<div class="card layer">
				<h3>Revealed Content</h3>
				<p>This is a card with some content</p>
			</div>
		</slot>
	</div>
</div>
