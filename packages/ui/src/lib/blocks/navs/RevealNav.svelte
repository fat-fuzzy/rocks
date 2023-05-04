<script lang="ts">
	import format from '../../utils/format'
	import {clickOutside} from '../../utils/click-outside.js'
	import LinkList from './LinkList.svelte'
	import mocks from '../../data/mocks'

	export let layout = 'stack'
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let height = ''
	export let color = ''
	export let path = ''
	export let id = 'ui'
	export let title = 'RevealNav'
	export let icon = ''
	export let align = 'start'
	export let items = mocks.nav

	let expanded = true

	function handleClickOutside(event) {
		// expanded = false
		// TODO : fix this
	}

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: show = expanded ? 'show right' : 'hide:viz-only'
	$: setHeight = height ? ` h:${height}` : ''
</script>

<div class={`l:reveal ${setHeight}`} use:clickOutside on:clickOutside={handleClickOutside}>
	<button
		id={`${id}-reveal-nav-button`}
		class={`card:${size} ${variant} bg:${color}`}
		aria-expanded={expanded}
		aria-controls={`${id}-reveal-nav`}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, icon)}
	</button>
	<nav
		id={`${id}-reveal-nav`}
		class={`l:${layout} bp:${breakpoint} layer card:lg polar ${size} ${show} ${setHeight}`}
	>
		<LinkList id={`${id}-${path}`} {path} {items} {size} {align} depth={0} />
	</nav>
</div>
