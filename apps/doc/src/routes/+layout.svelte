<script lang="ts">
	import {onMount, type Snippet} from 'svelte'
	import '@fat-fuzzy/style'

	import {page} from '$app/stores'
	import {links} from '$data/nav'
	import {recipes, utils, constants} from '@fat-fuzzy/ui'
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
	let footerClass = "font:sm card:2xl color:primary"

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
		items={{links, settings: {...constants.APP_SETTINGS, onupdate: updateSettings}}}
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
			<details class="l:side l:burrito:md maki:block:2xl">
				<summary class="card:2xs">About</summary>
				<p>
					Website and illustrations by Patricia Boh.
				</p>
			</details>
	</footer>
</div>
