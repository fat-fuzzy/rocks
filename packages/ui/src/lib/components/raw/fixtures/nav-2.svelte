<script lang="ts">
	import type {Snippet} from 'svelte'

	let {
		theme,
		layout,
		gare,
		children,
		width,
		height,
		size,
	}: {
		theme: string
		layout?: string
		gare?: string
		children?: Snippet
		width?: string
		height?: string
		size?: string
	} = $props()

	let layoutClass = $derived(layout ? `l:${layout} size:${size}` : '')
	let gareClass = $derived(gare ? `gare:${gare}` : '')
	let gareControl = $derived(gare ? 'gare-control' : '')
	let gareDepot = $derived(gare ? 'gare-depot' : '')
	let widthClass = $derived(width ? `width:${width}` : '')
	let heightClass = $derived(height ? `height:${height}` : '')
</script>

<div class={`sidebar ${layoutClass}`}>
	<details
		class={` ${gareClass} ${widthClass} ${heightClass} surface:3:${theme}`}
	>
		<summary id="nav-2-label" class={`${gareControl} ravioli:3xs`}>
			Nav 2
		</summary>
		<ff-reveal class={`${gareDepot} scroll:y layer:1`}>
			<nav id="nav-2" class="l:flex ravioli:md" aria-labelledby="nav-2-label">
				{#if children}
					{@render children()}
				{:else}
					<ol class="unstyled">
						{#each Array(20), i (i)}
							<li class="raviolink">Item {i + 1}</li>
						{/each}
					</ol>
				{/if}
			</nav>
		</ff-reveal>
	</details>
</div>
