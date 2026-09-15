<script lang="ts">
	import Loading from '$lib/ui/Loading.svelte'

	let {
		name,
		sectionName,
		subsectionName,
		observer,
	}: {
		name: string
		sectionName: string
		subsectionName?: string
		observer?: IntersectionObserver
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
	<Loading message="Loading block" />
</article>
