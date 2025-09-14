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
		direction = '',
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

			if (entry.intersectionRatio > 0.35) {
				animations.forEach((animation) => {
					element.classList.add(`image:${animation}:in`)
					element.classList.remove(`image:${animation}:out`)
				})
			} else if (entry.intersectionRatio <= 0) {
				animations.forEach((animation) => {
					element.classList.remove(`image:${animation}:in`)
					element.classList.add(`image:${animation}:out`)
				})
			}
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

<nav
	aria-labelledby="title"
	data-testid="scrolly"
	class={`scrolly scroll:container ${scrollContainerClasses}`}
>
	<ul
		bind:this={scrollArea}
		class={`scroll:y snap ${direction} w:full unstyled`}
	>
		<li class={`snap:center scroll:title`}>
			<svelte:element this={`h${level}`} id="title" class="w:full text:center">
				{title}
			</svelte:element>
		</li>
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
