<script lang="ts">
	import format from '$lib/utils/format'
	import LinkList from '$lib/components/recipes/navs/LinkList.svelte'

	export let layout = 'stack'
	export let container = 'layer card'
	export let size = ''
	export let breakpoint = ''
	export let variant = ''
	export let height = ''
	export let color = ''
	export let background = 'polar'
	export let path = ''
	export let id = 'reveal-nav'
	export let title = 'DetailsNav'
	export let icon = ''
	export let align = 'start'
	export let items: any = [] // TODO: fix type

	let expanded = true

	function toggleReveal(event) {
		expanded = !expanded
	}

	$: show = expanded ? `${container}:${size} bg:${background}` : 'hide:viz-only'
</script>

<nav
	id={`nav-${id}`}
	class={`l:${layout} bp:${breakpoint} ${size} ${show} h:${height}`}
	aria-label={title}
>
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
		<LinkList id={`${id}-${path}`} {path} {items} {size} {align} depth={0} />
	</details>
</nav>
