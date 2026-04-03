<script lang="ts">
	import '@fat-fuzzy/style/css'
	import constants from '$lib/types/constants.js'
	import ToggleReveal from '$lib/components/recipes/toggle-reveal/ToggleReveal.svelte'
	import type {Snippet} from 'svelte'

	import {resolve} from '$app/paths'
	import {page} from '$app/state'

	const {APP_SETTINGS, APP_LINKS} = constants

	type Props = {children: Snippet}

	let {children}: Props = $props()
	let headerData = $state({links: APP_LINKS, settings: APP_SETTINGS})

	let links = $derived(headerData.links)
	let layout = 'taco'
	let brightness = 'day'
	let contrast = 'contrast'
	let mainClass = `${brightness} l:${layout} l:stack:lg bg:${contrast}`
	let footerClass = 'font:sm ravioli:2xl color:primary'
</script>

<ToggleReveal
	id="header-nav"
	label="Menu"
	font="md"
	variant="outline"
	color="primary"
	asset="home"
	justify="center"
	dismiss="outside"
	auto={true}
	place="nord"
	breakpoint="sm"
	background="inherit"
>
	<ul
		class="header-nav l:switcher:2xs size:md unstyled color:primary align:center justify:evenly w:full bg:inherit"
	>
		<!-- <ul class={`header-nav unstyled ${navClasses}`}> -->
		<li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
			<a data-sveltekit-preload-data href={resolve('/')}>Home</a>
		</li>
		{#each links as { slug, label }, i (i)}
			<li
				aria-current={page.url.pathname?.startsWith(`/${slug}`)
					? 'page'
					: undefined}
			>
				<a data-sveltekit-preload-data href={resolve(`/${slug}`)}>
					{label}
				</a>
			</li>
		{/each}
	</ul>
</ToggleReveal>

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
