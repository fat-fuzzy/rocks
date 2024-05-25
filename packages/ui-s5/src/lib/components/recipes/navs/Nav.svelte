<script lang="ts">
	import type {NavProps} from './nav.types.js'
	import LinkList from '$lib/components/recipes/navs/LinkList.svelte'

	let {
		id,
		layout,
		title = 'Nav',
		size,
		path,
		color,
		background,
		container = 'card',
		align,
		items = [],
	}: NavProps = $props()

	let navClasses = `${color} ${container}:${size} bg:${background}`
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
