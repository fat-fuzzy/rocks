<script lang="ts">
	import format from '../../utils/format'
	import LinkList from './LinkList.svelte'
	import mocks from '../../../data/mocks'

	export let layout = 'stack'
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let color = ''
	export let path = ''
	export let id = 'reveal-nav'
	export let title = 'RevealNav'
	export let icon = ''
	export let align = 'start'
	export let items = mocks.nav

	let expanded = true

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: show = expanded ? 'layer card:lg contrast' : 'hidden:viz-only'
</script>

<details aria-labelledby={id} class={`l:reveal`} open>
	<summary
		{id}
		class={`card:${size} ${variant} ${color}`}
		aria-expanded={expanded}
		aria-controls={`nav-${id}`}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, icon)}
	</summary>
	<nav id={`nav-${id}`} class={`${show} ${size} l:${layout}:${size} bp:${breakpoint}`}>
		<LinkList id={`${id}-${path}`} {path} {items} {size} {align} depth={0} />
	</nav>
</details>
