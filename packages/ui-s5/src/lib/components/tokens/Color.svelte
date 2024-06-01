<script lang="ts">
	export let depth = 3

	const status = ['info', 'success', 'warning', 'error']
	const colors = ['primary', 'accent', 'highlight']
	const variants = ['000', '100', '200', '300', '400', '500', '600']
	const baseColor = ['light', 'dark']

	let colorClasses = `card:md l:stack:sm`
</script>

<div class="l:stack:xl">
	<section class="l:stack:xs">
		<svelte:element this={`h${depth + 1}`} class="font:lg maki:block:2xs">
			Base colors
		</svelte:element>
		<article class="l:switcher:2xs th:2xs">
			{#each baseColor as base}
				<figure class={`${colorClasses} bg:primary:${base}`}>
					<figcaption>color:{base}</figcaption>
				</figure>
			{/each}
		</article>
	</section>

	<section class="l:stack:xs">
		<svelte:element this={`h${depth + 1}`} class="font:lg maki:block:2xs">
			Theme colors
		</svelte:element>
		{#each colors as color}
			<article class="l:switcher:md th:md">
				<svelte:element this={`h${depth + 2}`} class="font:md">
					{color}
				</svelte:element>
				<div class="l:grid:2xs">
					{#each variants as variant}
						<figure class={`${colorClasses} bg:${color}:${variant}`}>
							<figcaption>{color}:{variant}</figcaption>
						</figure>
					{/each}
				</div>
			</article>
		{/each}
	</section>

	<section class="l:stack:md">
		<svelte:element this={`h${depth + 1}`} class="font:lg maki:block:2xs">
			Feedback status colors
		</svelte:element>
		{#each status as color}
			<article class="l:switcher:md th:md">
				<svelte:element this={`h${depth + 2}`} class="font:md">
					{color}
				</svelte:element>
				<div class="l:grid:2xs">
					{#each variants as variant}
						<figure
							class={`${colorClasses} status:${color} bg:${color}:${variant}`}
						>
							<figcaption>{color}:{variant}</figcaption>
						</figure>
					{/each}
				</div>
			</article>
		{/each}
	</section>
</div>
