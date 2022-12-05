<script lang="ts">
	import {clickOutside} from '../../utils/click-outside.js'
	import Nav from './Nav.svelte'

	export let layout = 'stack'
	export let size = ''
	export let variant = 'primary'
	export let alignment = 'start'
	export let items: {slug: string; title: string; emoji?: string}[] = []

	let expanded = false

	function toggleReveal(event) {
		expanded = !expanded
	}

	function handleClickOutside(event) {
		expanded = false
	}
	$: show = expanded ? 'show' : 'hide'
</script>

<menu class={`l-reveal l-${layout} ${size}`} use:clickOutside on:clickOutside={handleClickOutside}>
	<button
		type="button"
		class={`toggle collapse  ${size} ${variant}`}
		aria-expanded={expanded}
		on:click={toggleReveal}
	>
		👾 Sketches
	</button>
	<div class={`${alignment} ${show}`}>
		<Nav id="nav-sketches" {items} {layout} {size} path="/play" />
	</div>
</menu>
