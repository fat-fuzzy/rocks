<script lang="ts">
	import {onMount} from 'svelte'
	import type {ScrollyItemProps} from '$types'

	let {
		item,
		level,
		observer, // Observer from the parent component that is observing this component
		animations,
		variant = 'primary',
	}: {
		item: ScrollyItemProps
		level: number
		observer?: IntersectionObserver
		animations: string[]
		variant?: string
	} = $props()

	let observedArea: HTMLElement | undefined = $state()

	let classes = $derived(
		item.overlay
			? `${animations} overlay scroll:item snap:start`
			: `${animations} scroll:item snap:start`,
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
	{#if item.content && item.content.link}
		<div class="overlay unstyled place:end l:burrito:xl">
			<div class={`card:lg text:center emoji:recipes surface:4:${variant}`}>
				<a href={item.content.link} class="card font:md">
					{item.content.title}
				</a>
			</div>
		</div>
	{:else}
		{#if item.title}
			<svelte:element this={`h${level}`}>{item.title}</svelte:element>
			<p>{item.caption}</p>
		{/if}
		{#if item.caption}
			<svelte:element this={`h${level}`}>{item.title}</svelte:element>
			<p>{item.caption}</p>
		{/if}
	{/if}
</li>
