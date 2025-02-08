<script lang="ts">
	import {browser} from '$app/environment'
	import DOMPurify from 'dompurify'
	import {onMount} from 'svelte'

	let {id, html, size}: {id: string; html: string; size?: string} = $props()
	let purify
	let escaped = $state(html)
	onMount(() => {
		if (browser) {
			purify = DOMPurify(window)
			escaped = purify.sanitize(html)
		}
	})
</script>

<div class={size ? `l:text:${size}` : ''} data-testid={`html-${id}`}>
	{@html escaped}
</div>
