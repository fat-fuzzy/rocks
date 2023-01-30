<script lang="ts">
	import {clickOutside} from '../../utils/click-outside.js'
	import format from '../../utils/format'
	import LinkList from './LinkList.svelte'
	import fixtures from '../../../data/fixtures'

	export let layout = ''
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let color = ''
	export let path = ''
	export let id = ''
	export let title = 'RevealNav'
	export let icon = ''
	export let align = 'start'
	export let items = fixtures.nav

	let expanded = false

	function toggleReveal(event) {
		expanded = !expanded
	}

	function handleClickOutside(event) {
		expanded = false
	}

	$: show = expanded ? 'show card:lg layer contrast' : 'hide'
</script>

<nav aria-labelledby={id} class={`l:reveal l:${layout} bp:${breakpoint} ${size}`}>
	<button
		{id}
		type="button"
		class={`toggle collapse  ${size} ${variant} ${color}`}
		aria-expanded={expanded}
		aria-controls={`${id}-menu-list`}
		on:click={toggleReveal}
		use:clickOutside
		on:clickOutside={(event) => handleClickOutside(event)}
	>
		{format.formatLabel(title, icon)}
	</button>
	<div id={`${id}-menu-list`} class={show}>
		<LinkList id={`${id}-${path}`} {path} {items} {size} {align} depth={0} />
	</div>
</nav>
