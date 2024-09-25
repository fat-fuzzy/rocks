<script lang="ts">
	import {onMount, type Snippet} from 'svelte'
	import '$lib/styles/css/main.css'

	import {page} from '$app/stores'
	import ui from '@fat-fuzzy/ui'
	import fatFuzzyStore from '$lib/stores/stores.svelte'


	type Props = {
		fixed?: boolean
		sidebar?: Snippet
		children?: Snippet
	}

	let {children}: Props = $props()

	let app = fatFuzzyStore.app

	let brightness = $derived(app.settings?.brightness)
	let contrast = $derived(app.settings?.contrast)
	let pageClass = $derived(ui.utils.format.getClassNameFromPathname($page.url.pathname))
	let themeClass = $derived(`${pageClass} settings:${brightness}:${contrast} surface:0:neutral`)
	let footerClass = 'card:xs'
	let aboutContainerClass = $derived(pageClass === 'page:home' ? 'card:xl' : '')
	let footerOpen = $derived(pageClass === 'page:home' ? true : false)

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
console.log('Home fatFuzzyStore.app store');
console.log(fatFuzzyStore.app);
	})
</script>

<div class={themeClass}>
	<main id="main">
		{#if children}
			{@render children()}
		{:else}
			<p>Nothing to see here</p>
		{/if}
	</main>

	<footer class={footerClass}>
			<details class={`l:burrito:3xl color:neutral font:md maki:block:xl ${aboutContainerClass}`} open={footerOpen}>
				<summary class="card:2xs">About</summary>
				<p>
					Made with 🩷 by <a href="https://github.com/patiboh" target="_blank"
					rel="noopener">@patiboh</a>
				</p>
				<div class="rc-scout"></div>
			</details>
	</footer>
</div>
