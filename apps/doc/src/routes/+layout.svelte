<script lang="ts">
	import type {Snippet} from 'svelte'

	import {setContext} from 'svelte'
	import '$lib/styles/css/main.css'

	import {page} from '$app/state'
	import {links} from '$data/nav'
	import ui from '@fat-fuzzy/ui'
	import FatFuzzyStore from '$lib/stores/stores.svelte'
	import RcScout from '$lib/ui/RcScout.svelte'

	const {Header} = ui.recipes

	type Props = {
		fixed?: boolean
		sidebar?: Snippet
		children?: Snippet
	}

	let {children}: Props = $props()

	let store = new FatFuzzyStore(page.data.settings)
	setContext('fatFuzzyStore', store)

	let app = $derived(store.app)

	let brightness = $derived(app.settings.brightness)
	let contrast = $derived(app.settings.contrast)
	let pageClass = $derived(
		ui.utils.format.getClassNameFromPathname(page.url.pathname),
	)
	let themeClass = $derived(
		`${pageClass} settings:${brightness}:${contrast} surface:0:neutral`,
	)
	let footerClass = 'card:xs'
	let aboutContainerClass = $derived(pageClass === 'page:home' ? 'card:xl' : '')
	let footerOpen = $derived(pageClass === 'page:home' ? true : false)
	let settings = $derived.by(() => {
		let inputs = ui.constants.APP_SETTINGS
		inputs.switch.forEach((input) => {
			if (input.id === 'brightness') {
				input.value = brightness
				input.initial = brightness === 'night' ? 'active' : 'inactive'
			}
			if (input.id === 'contrast') {
				input.value = contrast
				input.initial = contrast === 'contrast' ? 'active' : 'inactive'
			}
		})
		return {
			...inputs,
			formaction: 'updateSettings',
			onupdate: updateSettings,
		}
	})

	function updateSettings(event) {
		switch (event.id) {
			case 'brightness':
				store.updateBrightness(event.value)
				break
			case 'contrast':
				store.updateContrast(event.value)
				break
			default:
				break
		}
	}
</script>

<div class={themeClass}>
	<Header
		id="nav"
		name="nav"
		label=""
		path={page.url.pathname}
		reveal={page.data.nav.reveal}
		actionPath="/"
		redirect={page.url.pathname}
		formaction="toggleNav"
		items={{
			links,
			settings,
		}}
		breakpoint="sm"
		{app}
	/>
	{#if children}
		{@render children()}
	{:else}
		<p>Nothing to see here</p>
	{/if}

	<footer class={footerClass}>
		<details
			class={`l:burrito:3xl color:neutral font:md maki:block:xl ${aboutContainerClass}`}
			open={footerOpen}
		>
			<summary class="card:2xs">About</summary>
			<div class="l:stack:2xl">
				<p>
					Made with 🩷 by <a
						href="https://github.com/patiboh"
						target="_blank"
						rel="noopener">@patiboh</a
					>
				</p>
				<RcScout />
			</div>
		</details>
	</footer>
</div>
