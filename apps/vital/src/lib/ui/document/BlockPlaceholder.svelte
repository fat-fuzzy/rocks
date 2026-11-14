<script lang="ts">
	import type {UiColor} from '@fat-fuzzy/ui'

	import Loading from '#lib/ui/display/Loading.svelte'

	let {
		name,
		sectionName,
		subsectionName,
		observer,
		color = 'neutral',
	}: {
		name: string
		sectionName: string
		subsectionName?: string
		observer?: IntersectionObserver
		color?: UiColor
	} = $props()

	let observedArea: HTMLElement | undefined = $state()

	$effect(() => {
		if (observer && observedArea) {
			observer.observe(observedArea)
		}
	})
</script>

<article
	data-block={name}
	data-section={sectionName}
	data-subsection={subsectionName}
	bind:this={observedArea}
	class="maki:block"
>
	<Loading message="Loading block" {color} />
</article>
