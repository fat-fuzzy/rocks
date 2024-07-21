<script lang="ts">
	import '@fat-fuzzy/style'
	import constants from '$lib/types/constants.js'
	import Header from '$lib/components/recipes/headers/Header.svelte'
	import type { Snippet } from 'svelte'

	const {APP_SETTINGS, APP_LINKS} = constants

	type Props = { children: Snippet }

	let {children}: Props = $props()
	let navItems = $state({links: APP_LINKS, settings: APP_SETTINGS})
	let layout = 'center'
	let brightness = 'day'
	let contrast = 'contrast'
	let mainClass = `${brightness} l:${layout} l:stack:lg bg:${contrast}`
	let footerClass = "font:sm card:2xl color:primary"
</script>

<Header items={navItems} layout="center" app={{settings: {brightness: 'day', contrast: 'blend'}}}>
	<h1 class="l:flex card:md icon:svg:egg size:xl font:xl align:center">
		Fat Fuzzy Style
	</h1>
</Header>
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
