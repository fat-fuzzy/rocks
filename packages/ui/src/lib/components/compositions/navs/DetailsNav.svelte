<script lang="ts">
	import format from '$lib/utils/format'
	import LinkList from '$lib/components/compositions/navs/LinkList.svelte'

	export let layout = 'stack'
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let height = ''
	export let color = ''
	export let path = ''
	export let id = 'reveal-nav'
	export let title = 'RevealNav'
	export let icon = ''
	export let align = 'start'
	export let items: any = [] // TODO: fix type

	let expanded = true

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: show = expanded ? 'layer card:lg polar' : 'hide:viz-only'
</script>

<details aria-labelledby={id} class={`l:detail h:${height}`} open>
	<summary
		{id}
		class={`card:${size} ${variant} bg:${color}`}
		aria-expanded={expanded}
		aria-controls={`nav-${id}`}
		on:click={toggleReveal}
	>
		{format.formatLabel(title, icon)}
	</summary>
	<nav id={`nav-${id}`} class={`l:${layout} bp:${breakpoint} ${size} ${show} h:${height}`}>
		<LinkList id={`${id}-${path}`} {path} {items} {size} {align} depth={0} />
	</nav>
</details>
