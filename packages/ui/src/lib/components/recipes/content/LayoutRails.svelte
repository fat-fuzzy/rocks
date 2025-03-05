<script lang="ts">
	import type {LayoutRailsProps} from '$types'

	let {size = 'md', children}: LayoutRailsProps = $props()
</script>

<div class={`l:grid:rails size:${size}`}>
	{#if children}
		{@render children()}
	{/if}
</div>
