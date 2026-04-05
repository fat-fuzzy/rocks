<script lang="ts">
	import type {NavProps} from '$types'

	import styleHelper from '$lib/utils/styles'
	import ToggleTree from '$lib/components/recipes/toggle/ToggleTree.svelte'

	let {
		id,
		layout,
		title = 'Nav',
		pathname,
		size,
		color,
		background,
		container,
		containerSize,
		align,
		items = [],
	}: NavProps = $props()

	let navClasses = $derived(
		styleHelper.getStyles({
			size,
			color,
			background,
			container,
			containerSize,
			align,
		}),
	)
</script>

<nav {id} class={navClasses} aria-label={title}>
	<ToggleTree
		id={`${id}-${pathname}`}
		{items}
		{pathname}
		depth={0}
		{layout}
		{size}
		{align}
	/>
</nav>
