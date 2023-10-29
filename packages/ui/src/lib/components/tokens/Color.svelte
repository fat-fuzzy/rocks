<script lang="ts">
	export let layout = 'stack'
	export let size = 'md'
	export let depth = '3'

	// const colors = ['primary', 'accent', 'highlight', 'info', 'success', 'warning', 'error']
	// const variants = ['darker', 'dark', 'light', 'lighter']
	const colors = ['primary', 'accent', 'highlight']
	const variants = ['light', 'lighter']

	$: cardClasses = `card  l:${layout}:${size}`
	$: colorClasses = `card:xxl l:stack:sm`
</script>

{#each colors as color}
	<article class={cardClasses}>
		<header>
			<svelte:element this={`h${depth}`} class="font:md">{color}</svelte:element>
		</header>
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
		<footer>
			<slot name="footer" />
		</footer>
	</article>
{/each}
