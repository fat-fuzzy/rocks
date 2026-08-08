<script lang="ts">
	import '@fat-fuzzy/style/css'
	import ui from '@fat-fuzzy/ui'

	import type {Snippet} from 'svelte'

	const {PageHeader} = ui.drafts

	type Props = {children: Snippet}

	let {children}: Props = $props()
	let layout = 'taco'
	let brightness = 'day'
	let contrast = 'contrast'
	let mainClass = `${brightness} l:${layout} l:stack:lg bg:${contrast}`
	let footerClass = `l:taco font:sm ${brightness} bg:${contrast}`
</script>

<PageHeader title="Fat Fuzzy Style" layout="taco">
	{#snippet main()}
		<h1 class="l:flex ravioli:md svg:egg size:xl font:xl align:center">
			Fat Fuzzy Style
		</h1>
	{/snippet}
</PageHeader>
<main class={mainClass}>
	{#if children}
		{@render children()}
	{/if}
</main>

<footer class={footerClass}>
	<p>
		👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
	</p>
</footer>
