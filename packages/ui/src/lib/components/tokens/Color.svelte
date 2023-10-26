<script lang="ts">
	export let layout = 'stack'
	export let size = 'md'

	// const colors = ['primary', 'accent', 'highlight', 'info', 'success', 'warning', 'error']
	// const variants = ['darker', 'dark', 'light', 'lighter']
	const colors = ['primary', 'accent', 'highlight']
	const variants = ['light', 'lighter']

	$: cardClasses = `card  l:${layout}:${size} box`
	$: colorClasses = `card:xxl l:stack:sm`
</script>

{#each colors as color}
	<article class={cardClasses}>
		<header>
			<h2>{color}</h2>
		</header>
		<main class="l:grid:xs">
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
