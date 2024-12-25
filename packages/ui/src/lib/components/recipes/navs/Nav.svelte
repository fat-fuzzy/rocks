<script lang="ts">
	import type {NavProps} from '$types'
	import LinkTree from '$lib/components/recipes/navs/LinkTree.svelte'

	let {
		id,
		layout,
		title = 'Nav',
		size,
		path,
		color,
		background,
		container,
		align,
		items = [],
	}: NavProps = $props()

	let backgroundClass = background ? `bg:${background}` : ''
	let colorClass = color ? `color:${color}` : ''
	let navClasses = `${colorClass} ${container}:${size} ${backgroundClass}`
</script>

<nav {id} class={navClasses} aria-label={title}>
	<LinkTree
		id={`${id}-${path}`}
		{items}
		{path}
		depth={0}
		{layout}
		{size}
		{align}
	/>
</nav>
