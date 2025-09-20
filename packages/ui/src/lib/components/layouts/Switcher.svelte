<script lang="ts">
	import type {LayoutPrimitiveProps} from '$types'

	let {size = 'md', threshold, children}: LayoutPrimitiveProps = $props()
</script>

<div class={`l:switcher:${size} th:${threshold}`}>
	{#if children}
		{@render children()}
	{/if}
</div>
