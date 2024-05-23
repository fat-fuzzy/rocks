<script lang="ts">
	import LinkList from '$lib/components/recipes/navs/LinkList.svelte'
	export let id = ''
	export let layout = ''
	export let title = 'Nav'
	export let size = ''
	export let path = ''
	export let color = ''
	export let background = ''
	export let container = 'card'
	export let align = ''
	export let items: any[] = []

	$: navClasses = `${color} ${container}:${size} bg:${background}`
</script>

<nav {id} class={navClasses} aria-label={title}>
	<LinkList
		id={`${id}-${path}`}
		{items}
		{path}
		depth={0}
		{layout}
		{size}
		{align}
	/>
</nav>
