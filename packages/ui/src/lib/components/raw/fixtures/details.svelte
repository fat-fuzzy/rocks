<script lang="ts">
	import type {Snippet} from 'svelte'

	let {
		title,
		theme,
		zone,
		layout,
		gare,
		surface,
		height,
		children,
	}: {
		title: string
		theme: string
		zone?: string
		layout?: string
		gare?: string
		height?: string
		surface?: string
		children?: Snippet
	} = $props()

	let zoneClass = zone ? zone : ''
	let layoutClass = layout ? `l:${layout}` : ''
	let surfaceClass = surface
		? `surface:${surface}:${theme}`
		: `surface:1:${theme}`
	let gareClass = gare ? `gare:${gare}` : ''
	let gareControl = gare ? 'gare-control' : ''
	let gareDepot = gare ? 'gare-depot' : ''
	let heightClass = height ? `height:${height}` : ''
</script>

<details
	class={`${zoneClass} ${gareClass} ${layoutClass} ${surfaceClass} ${heightClass}`}
>
	<summary class={`${gareControl} ravioli:3xs`}>{title}</summary>
	<ff-reveal class={`${gareDepot} scroll:y layer:1`}>
		{#if children}
			{@render children()}
		{:else}
			<ol class="unstyled">
				{#each Array(20) as _, i}
					<li class="raviolink">Item {i + 1}</li>
				{/each}
			</ol>
		{/if}
	</ff-reveal>
</details>
