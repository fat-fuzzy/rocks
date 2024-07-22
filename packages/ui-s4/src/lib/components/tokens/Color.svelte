<script lang="ts">
	export let depth = 3

	const status = ['info', 'success', 'warning', 'error']
	// const variants = ['darker', 'dark', 'light', 'lighter']
	const colors = ['primary', 'accent', 'highlight']
	const variants = ['light', 'lighter']

	$: colorClasses = `card:xxl l:stack:sm`
</script>

<div class="l:switcher:xxl th:md">
	<section class="card:xxl l:stack:md">
		<svelte:element this={`h${depth + 1}`} class="font:lg">Theme colors</svelte:element>
		{#each colors as color}
			<article>
				<svelte:element this={`h${depth + 2}`} class="font:md">{color}</svelte:element>
				<div class="l:grid:xxs">
					<figure class={`${colorClasses} bg:${color}`}>
						<figcaption>{color}</figcaption>
					</figure>
					{#each variants as variant}
						<figure class={`${colorClasses} bg:${color}:${variant}`}>
							<figcaption>{color}:{variant}</figcaption>
						</figure>
					{/each}
				</div>
			</article>
		{/each}
	</section>

	<section class="card:xxl l:stack:md">
		<svelte:element this={`h${depth + 1}`} class="font:lg">Feedback status colors</svelte:element>
		{#each status as color}
			<article>
				<svelte:element this={`h${depth + 2}`} class="font:md">{color}</svelte:element>
				<div class="l:grid:xxs">
					<figure class={`${colorClasses} bg:${color}`}>
						<figcaption>{color}</figcaption>
					</figure>
					{#each variants as variant}
						<figure class={`${colorClasses} bg:${color}:${variant}`}>
							<figcaption>{color}:{variant}</figcaption>
						</figure>
					{/each}
				</div>
			</article>
		{/each}
	</section>
</div>
