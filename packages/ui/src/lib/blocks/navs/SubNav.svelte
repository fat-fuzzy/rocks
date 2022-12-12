<script lang="ts">
	import {clickOutside} from '../../utils/click-outside.js'
	import LinkList from './LinkList.svelte'

	export let layout = 'stack'
	export let size = ''
	export let variant = 'primary'
	export let id = 'sub-nav'
	export let title = 'Sub Nav'
	export let align = 'start'
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

<nav
	aria-labelledby={id}
	class={`l-reveal l-${layout} ${size} sub-nav`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		{id}
		type="button"
		class={`toggle collapse  ${size} ${variant}`}
		aria-expanded={expanded}
		aria-controls={`${id}-menu-list`}
		on:click={toggleReveal}
	>
		{title}
	</button>
	<LinkList id={`${id}-menu-list`} path="/play" {items} {layout} {size} {align} {show} />
</nav>
