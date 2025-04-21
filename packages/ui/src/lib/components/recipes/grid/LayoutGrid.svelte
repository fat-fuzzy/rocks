<script lang="ts">
	import type {LayoutGridProps} from '$types'

	let {grid, theme, children}: LayoutGridProps = $props()
</script>

<div class={`l:grid:${grid} ${theme}`}>
	{#if children}
		{@render children()}
	{/if}
</div>
