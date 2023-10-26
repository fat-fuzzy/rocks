<script lang="ts">
	export let layout = 'text'
	export let size = 'md'
	export let color = ''

	const formats = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre']

	$: cardClasses = `card  l:${layout}:${size} ${color} box`
</script>

<article class={cardClasses}>
	{#each formats as text}
		<svelte:element this={text}>The quick brown fox jumps over the lazy dog</svelte:element>
	{/each}
</article>
