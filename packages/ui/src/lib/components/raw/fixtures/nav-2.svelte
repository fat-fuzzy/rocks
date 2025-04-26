<script lang="ts">
	import type {Snippet} from 'svelte'

	let {
		zone,
		theme,
		layout,
		gare,
		children,
	}: {
		zone: string
		theme: string
		layout?: string
		gare?: string
		children?: Snippet
	} = $props()

	let layoutClass = layout ? `l:${layout}` : ''
	let gareClass = gare ? `gare:${gare}` : ''
	let gareControl = gare ? 'gare-control' : ''
	let gareDepot = gare ? 'gare-depot' : ''
</script>

<details class={`${zone} ${gareClass} ${layoutClass} surface:3:${theme}`}>
	<summary id="nav-2-label" class={`${gareControl} ravioli:3xs`}>
		Nav 2
	</summary>
	<ff-reveal class={`${gareDepot} scroll:y layer:1`}>
		<nav id="nav-2" class="l:flex ravioli:md" aria-labelledby="#nav-2-label">
			{#if children}
				{@render children()}
			{:else}
				<ol class="unstyled">
					{#each Array(20) as _, i}
						<li class="raviolink">Item {i + 1}</li>
					{/each}
				</ol>
			{/if}
		</nav>
	</ff-reveal>
</details>
