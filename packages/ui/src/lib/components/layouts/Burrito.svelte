<script lang="ts">
	import type {LayoutPrimitiveProps} from '$types'
	let {size = 'md', children}: LayoutPrimitiveProps = $props()
</script>

<div class={`l:burrito:${size}`}>
	{#if children}
		{@render children()}
	{/if}
</div>
