<script lang="ts">
	import DOMPurify from 'dompurify'
	import {onMount} from 'svelte'
	let {html}: {html: string} = $props()
	let purify
	let escaped: string | undefined = $state()

	onMount(() => {
		if (window === undefined) return
		purify = DOMPurify(window)
		escaped = purify.sanitize(html)
	})
</script>

{#if escaped}
	{@html escaped}
{/if}
