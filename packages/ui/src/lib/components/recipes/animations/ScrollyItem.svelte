<script lang="ts">
	import {onMount} from 'svelte'
	import type {ScrollyItemProps} from '$types'
	import Picture from '$lib/components/blocks/media/Picture.svelte'

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
	class={`${animations} scroll:item snap:start l:flex align:center`}
>
	<div class="l:burrito:xl">
		{#if item.link}
			<div class={`card:xs text:center surface:4:${variant}`}>
				<a href={item.link} class={`card:xs h${level + 2} emoji:${item.asset}`}>
					{item.title}
				</a>
			</div>
		{:else if item.title}
			<div class={`card:lg text:center`}>
				<svelte:element
					this={`h${level}`}
					class={`emoji:${item.asset} h${level + 1}`}
				>
					{item.title}
				</svelte:element>
			</div>
		{/if}
	</div>
	{#if item.image}
		<div class="w:full col:center maki:block">
			<Picture {...item.image} />
		</div>
	{/if}
</li>
