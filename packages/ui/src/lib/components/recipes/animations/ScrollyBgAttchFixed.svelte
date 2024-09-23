<script lang="ts">
	import {onMount} from 'svelte'
	import type {PictureProps} from '$types'
	import ScrollyItem from './ScrollyItem.svelte'

	let {
		title,
		level = 3,
		overlay = false,
		animations = ['fade'],
		dimensions = 'video',
		items,
	}: {
		title?: string
		level?: number
		overlay?: boolean
		dimensions?: string
		animations?: string[]
		items: PictureProps[]
	} = $props()
	let prevRatio = $state(0.0)
	let scrollArea: HTMLElement | undefined = $state()
	let observer: IntersectionObserver | undefined = $state()
	let frameClasses = $derived(dimensions ? ` l:frame:${dimensions}` : 'l:frame')

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
			console.log(entry)

			if (entry.isIntersecting) {
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
		})
	}

	onMount(() => {
		if (!scrollArea) return
		if (!observer) {
			observer = new IntersectionObserver(handleIntersect, {
				root: scrollArea,
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
	<svelte:element this={`h${level}`}>{title}</svelte:element>
{/if}

<div class={`scroll:container ${frameClasses}`}>
	<ol bind:this={scrollArea} class={`scroll:y w:full`}>
		{#key observer}
			{#each items as item, index (index)}
				<ScrollyItem {observer} {item} {animations} level={level + 1} />
			{/each}
		{/key}
	</ol>
</div>
