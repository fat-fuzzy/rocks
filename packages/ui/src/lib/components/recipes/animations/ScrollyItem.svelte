<script lang="ts">
	import {onMount} from 'svelte'
	import type {PictureProps} from '$types'

	let {
		item,
		level,
		observer, // Observer from the parent component that is observing this component
		animations,
		overlay,
	}: {
		item: PictureProps
		level: number
		observer?: IntersectionObserver
		animations: string[]
		overlay?: boolean
	} = $props()

	let observedArea: HTMLElement | undefined = $state()

	let classes = $derived(
		overlay
			? `${animations} item snap:start overlay`
			: `${animations} item snap:start`,
	)

	onMount(() => {
		if (!observedArea) return
		if (observer) {
			observer.observe(observedArea)
		}
		return () => {
			if (observer && observedArea) {
				observer.unobserve(observedArea)
			}
		}
	})
</script>

<li
	bind:this={observedArea}
	class={classes}
	style={`--image-url: url(${item.src}-1000.${item.ext});`}
>
	{#if item.title}
		<svelte:element this={`h${level + 1}`}>{item.title}</svelte:element>
	{/if}
	{#if item.caption}
		<p>{item.caption}</p>
	{/if}
</li>
