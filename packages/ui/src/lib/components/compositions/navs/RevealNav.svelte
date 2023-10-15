<script lang="ts">
	import format from '$lib/utils/format'
	import {clickOutside} from '$lib/utils/click-outside.js'
	import LinkList from '$lib/components/compositions/navs/LinkList.svelte'
	import mocks from '$lib/data/mocks'

	export let layout = 'stack'
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let height = ''
	export let color = ''
	export let path = ''
	export let page = ''
	export let id = 'ui'
	export let title = 'RevealNav'
	export let asset = ''
	export let align = 'start'
	export let place = 'left'
	export let items = mocks.nav

	let expanded = true

	function handleClickOutside(event) {
		// expanded = false
		// TODO : fix this
	}

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: show = expanded ? `show ${place}` : `minimize ${place}`
	$: setHeight = height ? ` h:${height}` : ''
</script>

<div
	class={`l:reveal ${show} ${setHeight} l:${layout}`}
	use:clickOutside
	on:clickOutside={handleClickOutside}
>
	<button
		id={`${id}-reveal-nav-button`}
		class={`card:${size} ${variant} ${color} font:sm`}
		aria-expanded={expanded}
		aria-controls={`${id}-reveal-nav`}
		on:click={toggleReveal}
	>
		<span class="text">{format.formatLabel(title, asset)}</span>
	</button>
	<nav
		id={`${id}-reveal-nav`}
		class={`content l:${layout} bp:${breakpoint} layer polar card:${size} align:${align} ${size} ${setHeight}`}
	>
		<LinkList id={`${id}-${path}`} {page} {path} {items} {size} {align} depth={0} />
	</nav>
</div>
