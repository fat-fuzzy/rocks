<script lang="ts">
	type Props = {
		depth?: number
	}
	let {depth = 3}: Props = $props()

	const status = ['info', 'success', 'warning', 'danger']
	const colors = ['primary', 'accent', 'highlight']
	const statusVariants = ['0', '1', '2', '3', '4', '5']
	const variants = ['0', '1', '2', '3', '4', '5']
	const baseColor = ['light', 'dark']

	let colorClasses = `ravioli:md l:stack:sm font:sm text:center`
</script>

<div class="l:stack:xl">
	<section class="l:stack:xs">
		<svelte:element this={`h${depth + 1}`} class="font:lg maki:block:2xs">
			Base colors
		</svelte:element>
		<div class="l:grid:auto size:md">
			{#each baseColor as base, i (i)}
				<figure class={`${colorClasses} surface:${base}:neutral`}>
					<figcaption>color:{base}</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<section class="l:stack:xs">
		<svelte:element this={`h${depth + 1}`} class="font:lg maki:block:2xs">
			Theme colors
		</svelte:element>
		<div class="l:grid:auto size:sm">
			{#each colors as color, i (i)}
				<article class="l:switcher:md th:md">
					<svelte:element this={`h${depth + 2}`} class="font:md">
						{color}
					</svelte:element>
					<div class="l:stack:2xs">
						{#each variants as variant, i (i)}
							<figure class={`${colorClasses} surface:${variant}:${color}`}>
								<figcaption>{color}:{variant}</figcaption>
							</figure>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="l:stack:md">
		<svelte:element this={`h${depth + 1}`} class="font:lg maki:block:2xs">
			Semantic colors
		</svelte:element>
		<div class="l:grid:auto size:xs">
			{#each status as color, i (i)}
				<article class="l:switcher:md th:md">
					<svelte:element this={`h${depth + 2}`} class="font:md">
						{color}
					</svelte:element>
					<div class="l:stack:2xs">
						{#each statusVariants as variant, i (i)}
							<figure class={`${colorClasses} surface:${variant}:${color}`}>
								<figcaption>{color}:{variant}</figcaption>
							</figure>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</section>
</div>
