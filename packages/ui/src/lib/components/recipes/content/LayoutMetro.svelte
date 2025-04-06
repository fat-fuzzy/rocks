<script lang="ts">
	import type {LayoutRailsProps} from '$types'

	let {size = 'md', theme, children}: LayoutRailsProps = $props()
</script>

<div class={`l:grid:metro size:${size} ${theme}`}>
	{#if children}
		{@render children()}
	{/if}
</div>
