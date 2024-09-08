<script lang="ts">
	import type {LayoutProps} from '$types'

	let {size = 'md', threshold, children}: LayoutProps = $props()
</script>

<div class={`l:switcher:${size} th:${threshold}`}>
	{#if children}
		{@render children()}
	{/if}
</div>
