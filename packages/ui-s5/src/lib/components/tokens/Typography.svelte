<script lang="ts">
	type Props = {
		layout: string
		size: string
		color: string
	}
	let {layout = 'text', size = 'md', color}: Props = $props()

	const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	const body = ['p', 'pre']

	let cardClasses = `card:md l:${layout}:${size}`
</script>

<article class={cardClasses}>
	{#each headings as text}
		<svelte:element this={text} class={color}>
			Fox Jumps Over Dog
		</svelte:element>
	{/each}
	{#each body as text}
		<svelte:element this={text}>
			The quick brown fox jumps over the lazy dog
		</svelte:element>
	{/each}
</article>
