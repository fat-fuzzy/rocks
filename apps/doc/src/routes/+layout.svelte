<script lang="ts">
	import {onDestroy, type Snippet} from 'svelte'
	import '@fat-fuzzy/style'

	import {page} from '$app/stores'
	import {links, itemsSettings} from '$data/nav'
	import {recipes, stores, utils, constants} from '@fat-fuzzy/ui-s5'

	const {Header} = recipes
	const {settings} = stores
	const {DEFAULT_APP_SETTINGS, APP_LINKS} = constants

	type Props = {
		sidebar?: Snippet
		children?: Snippet
	}

	let {children}:Props = $props()

	let appSettings = $page.data.app || DEFAULT_APP_SETTINGS

	const localStores = [
		settings.app.subscribe((value) => {
			if (value) {
				appSettings = value
			}
		}),
	]

	let brightness = appSettings.brightness
	let contrast = appSettings.contrast
	let pageClass = utils.format.getClassNameFromUrl($page.url)
	let layoutClass =
		APP_LINKS.find((link) => link.slug === pageClass)?.layout ?? ''
	let mainClass = `${pageClass} ${brightness} bg:${contrast} l:page:${layoutClass}`
	let footerClass = `l:center font:sm ${brightness} bg:${contrast}`

	onDestroy(() => {
		localStores.forEach((unsubscribe) => unsubscribe())
	})
</script>

<Header
	id="doc"
	actionPath="/"
	formaction="toggleNav"
	redirect={$page.url.pathname}
	items={{links, settings: itemsSettings}}
	breakpoint="xs"
/>

<main id="main" class={mainClass}>
	{#if children}
		{@render children()}
	{:else}
		<p>Nothing to see here</p>
	{/if}
</main>

<footer class={footerClass}>
	<p>
		👉 Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
	</p>
</footer>
