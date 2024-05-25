<script lang="ts">
	import type { Snippet } from "svelte"

	type Props = {size: string, content?: Snippet}
	let {size = 'md', content}: Props = $props()
</script>

<div class={`l:burrito:${size}`}>
	{#if content}
		{@render content()}
	{:else}
		<p>Placeholder content</p>
	{/if}
</div>
