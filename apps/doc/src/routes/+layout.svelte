<script lang="ts">
	import {onMount, type Snippet} from 'svelte'
	import '@fat-fuzzy/style'

	import {page} from '$app/stores'
	import {links, itemsSettings} from '$data/nav'
	import {recipes, utils} from '@fat-fuzzy/ui-s5'
	import fatFuzzyStore from '$lib/stores/stores.svelte'

	const {Header} = recipes

	type Props = {
		sidebar?: Snippet
		children?: Snippet
	}

	let {children}: Props = $props()

	let app = fatFuzzyStore.app

	let brightness = $derived(app.settings.brightness)
	let contrast = $derived(app.settings.contrast)
	let pageClass = $derived(utils.format.getClassNameFromPathname($page.url.pathname))
	let themeClass = $derived(`${pageClass} settings:${brightness}:${contrast} surface:0:neutral`)
	let footerClass = "l:center font:sm"

	function updateSettings(event) {
		switch (event.id) {
			case 'brightness':
				app.settings.brightness = event.value
				break
			case 'contrast':
				app.settings.contrast = event.value
				break
			default:
				break
		}
	}

	onMount(() => {
		if($page.data.app) {
			fatFuzzyStore.app = $page.data.app
		}
	})
</script>

<div class={themeClass}>
	<Header
		id="doc"
		path={$page.url.pathname}
		actionPath="/"
		formaction="toggleNav"
		items={{links, settings: {...itemsSettings, onupdate: updateSettings}}}
		breakpoint="sm"
	/>
	<main id="main">
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
</div>
