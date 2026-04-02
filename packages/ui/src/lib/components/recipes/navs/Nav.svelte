<script lang="ts">
	import type {NavProps} from '$types'
	import ToggleTree from '$lib/components/recipes/toggle-reveal/ToggleTree.svelte'

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

	let backgroundClass = $state(background ? `bg:${background}` : '')
	let colorClass = $state(color ? `color:${color}` : '')
	let navClasses = $state(
		`${colorClass} ${container}:${size} ${backgroundClass}`,
	)
</script>

<nav {id} class={navClasses} aria-label={title}>
	<ToggleTree
		id={`${id}-${path}`}
		{items}
		{path}
		depth={0}
		{layout}
		{size}
		{align}
	/>
</nav>
