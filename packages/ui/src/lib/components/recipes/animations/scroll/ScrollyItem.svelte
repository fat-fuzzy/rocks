<script lang="ts">
	import {onMount} from 'svelte'
	import type {ScrollyItemProps} from '$types'
	import Picture from '$lib/components/blocks/media/Picture.svelte'
	import Magic from '$lib/components/blocks/global/Magic.svelte'

	let {
		item,
		level,
		observer, // Observer from the parent component that is observing this component
		animations,
		variant = 'primary',
		snap = 'start',
		magic,
	}: {
		item: ScrollyItemProps
		level: number
		observer?: IntersectionObserver
		animations: string[]
		variant?: string
		snap?: string
		magic?: {spell: string; shape?: string}
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

	let shapeClass = $derived(magic?.shape ? `shape:${magic?.shape}` : '')
</script>

<li bind:this={observedArea} class={`${animations} scroll:item snap:${snap}`}>
	{#if item.link}
		{#if item.image}
			<div class="media l:stack:2xl">
				<a
					href={item.link}
					class={`h${level + 2} item-link text:center justify:center maki:auto bg:light ${shapeClass}`}
				>
					{#if magic}
						<Magic {...magic} size="lg">
							{item.title}
						</Magic>
					{:else}
						<span
							class={`ravioli:xs font:lg ${shapeClass} surface:4:${variant}`}
						>
							{item.title}
						</span>
					{/if}
				</a>
				<Picture {...item.image} />
			</div>
		{:else}
			<a href={item.link} class={`h${level + 2}`}>
				<div class="media l:stack:2xl">
					{item.title}
				</div>
			</a>
		{/if}
	{:else if item.title}
		<div class={`ravioli:lg text:center`}>
			<svelte:element
				this={`h${level}`}
				class={`emoji:${item.asset} h${level + 1}`}
			>
				{item.title}
			</svelte:element>
		</div>
		{#if item.image}
			<div class="media l:stack:2xl">
				<Picture {...item.image} />
			</div>
		{/if}
	{/if}
</li>
