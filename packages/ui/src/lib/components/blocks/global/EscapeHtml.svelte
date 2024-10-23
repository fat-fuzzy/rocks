<script lang="ts">
	import DOMPurify from 'dompurify'
	import {onMount} from 'svelte'

	let {id, html, size}: {id: string; html: string; size?: string} = $props()
	let purify
	let escaped: string | undefined = $state()

	onMount(() => {
		if (window === undefined) return
		purify = DOMPurify(window)
		escaped = purify.sanitize(html)
	})
</script>

{#if escaped}
	<div class={size ? `l:text:${size}` : ''} data-testid={`html-${id}`}>
		{@html escaped}
	</div>
{/if}
