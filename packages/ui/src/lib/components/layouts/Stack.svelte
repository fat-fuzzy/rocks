<script lang="ts">
	import type {LayoutProps} from '$types'

	let {size = 'md', children}: LayoutProps = $props()
</script>

<div class={`l:stack:${size}`}>
	{#if children}
		{@render children()}
	{/if}
</div>
