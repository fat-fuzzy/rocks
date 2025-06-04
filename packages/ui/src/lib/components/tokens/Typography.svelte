<script lang="ts">
	type Props = {
		color: string
	}
	let {color}: Props = $props()

	const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	const body = ['p', 'pre']
</script>

{#each headings as text, i (i)}
	<svelte:element this={text} class={color}>
		Fox Jumps Over Dog
	</svelte:element>
{/each}
{#each body as text, i (i)}
	<svelte:element this={text}>
		The quick brown fox jumps over the lazy dog
	</svelte:element>
{/each}
