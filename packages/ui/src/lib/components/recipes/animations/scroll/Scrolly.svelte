<script lang="ts">
	import {onMount} from 'svelte'
	import type {ScrollyProps} from '$types'
	import ScrollyItem from './ScrollyItem.svelte'

	let {
		title,
		level,
		fixed = false,
		animations = ['fade'],
		dimensions,
		items,
		snap = 'start',
		magic,
	}: ScrollyProps = $props()

	let prevRatio = $state(0.0)
	let nestedLevel = $derived(level && title ? level + 1 : level ? level : 2)
	let scrollArea: HTMLElement | undefined = $state()
	let observer: IntersectionObserver | undefined = $state()
	let frameClasses = $derived(dimensions ? ` l:frame:${dimensions}` : '')
	let scrollContainerClasses = $derived(
		fixed ? `fixed ${frameClasses}` : frameClasses,
	)

	function buildThresholdList() {
		let thresholds = []
		const numSteps = items.length - 1

		for (let i = 1.0; i <= numSteps; i++) {
			let ratio = i / numSteps
			thresholds.push(ratio)
		}

		thresholds.push(0)
		return thresholds
	}

	function handleIntersect(entries: IntersectionObserverEntry[]) {
		entries.forEach((entry) => {
			let element = entry.target

			if (entry.intersectionRatio > 0.05) {
				animations.forEach((animation) => {
					element.classList.add(`${animation}:in`)
					element.classList.remove(`${animation}:out`)
				})
			} else {
				animations.forEach((animation) => {
					element.classList.remove(`${animation}:in`)
					element.classList.add(`${animation}:out`)
				})
			}
			prevRatio = entry.intersectionRatio
		})
	}

	onMount(() => {
		if (!scrollArea) return
		if (!observer) {
			observer = new IntersectionObserver(handleIntersect, {
				rootMargin: '0px',
				threshold: buildThresholdList(),
			})
		}
		return () => {
			if (observer && scrollArea) {
				observer.unobserve(scrollArea)
			}
		}
	})
</script>

{#if title}
	<svelte:element this={`h${level}`}></svelte:element>
{/if}

<nav
	data-testid="scrolly"
	class={`scrolly scroll:container ${scrollContainerClasses}`}
>
	<ul bind:this={scrollArea} class="scroll:y snap w:full unstyled">
		{#key observer}
			{#each items as item, index (index)}
				<ScrollyItem
					{observer}
					{item}
					{animations}
					level={nestedLevel}
					{magic}
					{snap}
				/>
			{/each}
		{/key}
	</ul>
</nav>
