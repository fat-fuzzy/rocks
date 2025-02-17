<script lang="ts">
	import {browser} from '$app/environment'
	import DOMPurify from 'dompurify'
	import {onMount} from 'svelte'

	let {
		id,
		html,
		layout = 'text',
		size,
		element,
		margin,
	}: {
		id: string
		html: string
		size?: string
		layout?: string
		margin?: string
		element?: string
	} = $props()
	let purify
	let escaped = $state(html)
	let containerTag = $state(element || 'div')
	let textClass = $state(size ? `l:${layout}:${size}` : `l:${layout}`)
	let marginClass = $state(margin ? `margin:${margin}` : '')
	let containerClasses = $state(`${textClass} ${marginClass}`)
	onMount(() => {
		if (browser) {
			purify = DOMPurify(window)
			escaped = purify.sanitize(html)
		}
	})
</script>

<svelte:element
	this={containerTag}
	class={containerClasses}
	data-testid={`html-${id}`}
>
	{@html escaped}
</svelte:element>
