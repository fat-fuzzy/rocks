<script lang="ts">
	import type {SequenceProps, FuzzyPayload} from '$types'
	import {onMount} from 'svelte'
	import Head from '$lib/components/blocks/global/Head.svelte'
	import Item from '$lib/components/recipes/animations/sequence/Item.svelte'
	import Actor from '$lib/utils/move/actor.svelte.js'

	let {
		title = 'PageMain',
		description = `Basic page layout`,
		pageName,
		size,
		layout = 'sidebar',
		mode = 'divvy',
		direction = 'vertical',
		justify,
		header,
		items,
	}: SequenceProps = $props()

	function onmovestart(payload: FuzzyPayload) {
		console.log('onmovestart', payload)
	}
	function onmove(payload: FuzzyPayload) {
		console.log('onmove', payload)
	}
	function onmoveend(payload: FuzzyPayload) {
		console.log('onmoveend', payload)
	}
	let actor = new Actor({
		movestart: onmovestart,
		move: onmove,
		moveend: onmoveend,
	})

	let frame: HTMLElement | undefined = $state()
	let observer: IntersectionObserver | undefined = $state()
	let width = $state(0)
	let height = $state(0)
	let currentPage = $state(pageName ?? title)
	let justifyClass = $derived(justify ? `justify:${justify}` : '')
	let layoutClass = $derived(size ? `l:${layout}:${size}` : `l:${layout}`)
	let headerClass = $derived(
		`${layoutClass} ${justifyClass} align:baseline maki:block:lg`,
	)

	let currentItem = $state(0)

	onMount(() => {
		if (!frame) return
		if (observer) {
			observer.observe(frame)
		}
		return () => {
			if (observer && frame) {
				observer.unobserve(frame)
			}
		}
	})
</script>

<Head pageName={currentPage} {title} {description} />

<section id="content">
	<header class={headerClass}>
		{#if header}
			{@render header()}
		{:else}
			<h1 class="maki:block:md">{title}</h1>
		{/if}
	</header>
	<div
		class="l:frame:twin"
		bind:this={frame}
		bind:clientWidth={width}
		bind:clientHeight={height}
	>
		<ol class={`sequence:${direction} ${mode} unstyled dnd:container`}>
			{#each items as item, index (item.link)}
				<Item {item} level={0} active={index === currentItem} />
			{/each}
			<li id="drag-handle" class="handle">
				<hr class="bg:primary:300" />
				<button
					class="ff:magic magic:dante shape:round emoji:spicy size:xl variant:outline"
					aria-labelledby="Move Me"
				></button>
			</li>
		</ol>
	</div>
</section>

<style>
	.divvy {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.handle {
		position: absolute;
		left: 0;
		right: 0;
		height: 4px;

		button {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, 145%);
		}
	}
</style>
