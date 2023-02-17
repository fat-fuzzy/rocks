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
	export let id = ''
	export let title = 'RevealNav'
	export let icon = ''
	export let align = 'start'
	export let items = mocks.nav
	export let fixed = true

	let expanded = true

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: show = expanded ? 'layer card:lg contrast' : 'hidden:viz-only'
</script>

<details
	aria-labelledby={id}
	class={`l:reveal fixed:start l:${layout} bp:${breakpoint} ${size}`}
	open
>
	<summary
		{id}
		class="card:lg box"
		aria-expanded={expanded}
		aria-controls={`${id}-menu-list`}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, icon)}
	</summary>
	<div id={`${id}-menu-list`} class={show}>
		<LinkList id={`${id}-${path}`} {path} {items} {size} {align} depth={0} />
	</div>
</details>
