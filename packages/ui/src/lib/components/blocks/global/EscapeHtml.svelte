<script lang="ts">
	import {browser} from '$app/environment'
	import DOMPurify from 'isomorphic-dompurify'
	import {onMount} from 'svelte'

	let {id, html, size}: {id: string; html: string; size?: string} = $props()
	let escaped = $state(html)
	onMount(() => {
		if (browser) {
			escaped = DOMPurify.sanitize(html)
		}
	})
</script>

{#if escaped}
	<div class={size ? `l:text:${size}` : ''} data-testid={`html-${id}`}>
		{@html escaped}
	</div>
{/if}
