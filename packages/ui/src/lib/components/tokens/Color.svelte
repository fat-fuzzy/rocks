<script lang="ts">
	export let layout = 'stack'
	export let size = 'md'
	export let depth = 3

	const statuses = ['info', 'success', 'warning', 'error']
	// const variants = ['darker', 'dark', 'light', 'lighter']
	const colors = ['primary', 'accent', 'highlight']
	const variants = ['light', 'lighter']

	$: cardClasses = `card l:${layout}:${size}`
	$: colorClasses = `card:xxl l:stack:sm`
</script>

<div class="l:switcher bp:lg">
	<section>
		<div class="l:stack:md">
			<svelte:element this={`h${depth}`} class="font:lg">Theme colors</svelte:element>
			{#each colors as color}
				<article class={cardClasses}>
					<svelte:element this={`h${depth - 1}`} class="font:md">{color}</svelte:element>
					<main class="l:grid:xxs">
						<figure class={`${colorClasses} bg:${color}`}>
							<figcaption>{color}</figcaption>
						</figure>
						{#each variants as variant}
							<figure class={`${colorClasses} bg:${color}:${variant}`}>
								<figcaption>{color}:{variant}</figcaption>
							</figure>
						{/each}
					</main>
				</article>
			{/each}
		</div>
	</section>

	<section>
		<div class="l:stack:md">
			<svelte:element this={`h${depth}`} class="font:lg">Feedback status colors</svelte:element>
			{#each statuses as color}
				<article class={cardClasses}>
					<svelte:element this={`h${depth - 1}`} class="font:md">{color}</svelte:element>
					<main class="l:grid:xxs">
						<figure class={`${colorClasses} bg:${color}`}>
							<figcaption>{color}</figcaption>
						</figure>
						{#each variants as variant}
							<figure class={`${colorClasses} bg:${color}:${variant}`}>
								<figcaption>{color}:{variant}</figcaption>
							</figure>
						{/each}
					</main>
				</article>
			{/each}
		</div>
	</section>
</div>
