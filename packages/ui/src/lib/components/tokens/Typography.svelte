<script lang="ts">
	export let layout = 'text'
	export let size = 'md'
	export let color = ''

	const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	const body = ['p', 'pre']

	$: cardClasses = `card  l:${layout}:${size} ${color}`
</script>

<article class={cardClasses}>
	{#each headings as text}
		<svelte:element this={text}>Fox Jumps Over Dog</svelte:element>
	{/each}
	{#each body as text}
		<svelte:element this={text}>The quick brown fox jumps over the lazy dog</svelte:element>
	{/each}
</article>
