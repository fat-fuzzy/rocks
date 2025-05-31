<script lang="ts">
	import {browser} from '$app/environment'
	import DOMPurify from 'dompurify'
	import {onMount} from 'svelte'

	let {
		id,
		html,
		layout = 'text',
		size,
		font,
		element,
		margin,
	}: {
		id: string
		html: string
		size?: string
		font?: string
		layout?: string
		margin?: string
		element?: string
	} = $props()
	let purify
	let escaped = $state(html)
	let containerTag = $state(element || 'div')
	let textClass = $state(size ? `l:${layout}:${size}` : `l:${layout}`)
	let fontClass = $state(font ? `font:${font}` : '')
	let marginClass = $state(margin ? `maki:${margin}` : '')
	let containerClasses = $state(`${textClass} ${marginClass} ${fontClass}`)
	onMount(() => {
		if (browser) {
			purify = DOMPurify(window)
			escaped = purify.sanitize(html)
		}
	})
</script>

<svelte:element
	this={containerTag}
	{id}
	class={containerClasses}
	data-testid={`html-${id}`}
>
	<!-- This should only render if it has been escaped -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html escaped}
</svelte:element>
