<script lang="ts">
	import {onMount} from 'svelte'
	import type {ScrollyItemProps} from '$types'
	import ScrollyItem from '../ScrollyItem.svelte'

	let {
		title,
		level,
		fixed = false,
		animations = ['fade'],
		dimensions,
		items,
	}: {
		title?: string
		level?: number
		fixed?: boolean
		dimensions?: string
		animations?: string[]
		items: ScrollyItemProps[]
	} = $props()
	let prevRatio = $state(0.0)
	let nestedLevel = $derived(level && title ? level + 1 : level ? level : 2)
	let scrollArea: HTMLElement | undefined = $state()
	let observer: IntersectionObserver | undefined = $state()
	let frameClasses = $derived(dimensions ? ` l:frame:${dimensions}` : 'l:frame')
	let scrollContainerClasses = $derived(
		fixed ? `fixed ${frameClasses}` : frameClasses,
	)

	function buildThresholdList() {
		let thresholds = []
		const numSteps = 3.0

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

			if (entry.intersectionRatio > 0.3) {
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

<nav data-testid="scrolly" class={`scroll:container ${scrollContainerClasses}`}>
	<ul bind:this={scrollArea} class="scroll:y w:full unstyled">
		{#key observer}
			{#each items as item, index (index)}
				<ScrollyItem {observer} {item} {animations} level={nestedLevel} />
			{/each}
		{/key}
	</ul>
</nav>
