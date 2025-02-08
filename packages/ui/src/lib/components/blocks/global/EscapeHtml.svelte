<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify'

	let {id, html, size}: {id: string; html: string; size?: string} = $props()
	let escaped = $state(DOMPurify.sanitize(html))
</script>

{#if escaped}
	<div class={size ? `l:text:${size}` : ''} data-testid={`html-${id}`}>
		{@html escaped}
	</div>
{/if}
