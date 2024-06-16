<script lang="ts">
	import {type Snippet} from 'svelte'
	import '@fat-fuzzy/style'

	import {page} from '$app/stores'
	import {links, itemsSettings} from '$data/nav'
	import {recipes, utils, constants} from '@fat-fuzzy/ui-s5'

	const {Header} = recipes
	const {DEFAULT_APP_SETTINGS, APP_LINKS} = constants

	type Props = {
		sidebar?: Snippet
		children?: Snippet
	}

	let {children}: Props = $props()

	let appSettings = $state($page.data.app || DEFAULT_APP_SETTINGS)


	let brightness = $derived(appSettings.brightness)
	let contrast = $derived(appSettings.contrast)
	let pageClass = utils.format.getClassNameFromPathname($page.url.pathname)
	let layoutClass =
		APP_LINKS.find((link) => link.slug === pageClass)?.layout ?? ''
	let mainClass =  $derived(`${pageClass} settings:${brightness}:${contrast} l:page:${layoutClass}`)
	let footerClass =  $derived(`l:center font:sm settings:${brightness}:${contrast}`)

	function updateSettings(event) {
		switch (event.id) {
			case 'brightness':
				appSettings.brightness = event.value
				break
			case 'contrast':
				appSettings.contrast = event.value
				break
			default:
				break
		}
	}
</script>

<Header
	id="doc"
	path={$page.url.pathname}
	actionPath="/"
	formaction="toggleNav"
	redirect={$page.url.pathname}
	items={{links, settings: {...itemsSettings, onupdate: updateSettings}}}
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
