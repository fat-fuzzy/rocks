<script lang="ts">
	import '@fat-fuzzy/style'
	import constants from '$lib/types/constants.js'
	import Header from '$lib/components/recipes/header/Header.svelte'
	import type {Snippet} from 'svelte'

	const {APP_SETTINGS, APP_LINKS} = constants

	type Props = {children: Snippet}

	let {children}: Props = $props()
	let headerData = $state({links: APP_LINKS, settings: APP_SETTINGS})
	let layout = 'taco'
	let brightness = 'day'
	let contrast = 'contrast'
	let mainClass = `${brightness} l:${layout} l:stack:lg bg:${contrast}`
	let footerClass = 'font:sm ravioli:2xl color:primary'
</script>

<Header
	main={headerData.links}
	context={headerData.settings}
	layout="taco"
	app={{brightness: 'day', contrast: 'blend'}}
>
	<h1 class="l:flex ravioli:md icon:svg:egg size:xl font:xl align:center">
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
