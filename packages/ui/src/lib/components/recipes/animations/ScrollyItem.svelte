<script lang="ts">
	import {onMount} from 'svelte'
	import type {PictureProps} from '$types'
	import Picture from '$lib/components/blocks/media/Picture.svelte'

	let {
		item,
		level,
		observer, // Observer from the parent component that is observing this component
		animations,
	}: {
		item: PictureProps
		level: number
		observer?: IntersectionObserver
		animations: string[]
	} = $props()

	let observedArea: HTMLElement | undefined = $state()

	let classes = $derived(`${animations} scroll:item`)

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

<li bind:this={observedArea} class={classes}>
	{#if item.title}
		<svelte:element this={`h${level + 1}`}>{item.title}</svelte:element>
	{/if}
	<Picture {...item} />
	{#if item.caption}
		<p>{item.caption}</p>
	{/if}
</li>
