<script lang="ts">
	import type {Snippet} from 'svelte'

	import '$lib/styles/css/main.css'

	import {page} from '$app/state'
	import {links} from '$data/nav'
	import ui from '@fat-fuzzy/ui'
	import RcScout from '$lib/ui/RcScout.svelte'

	const {Header} = ui.recipes

	type Props = {
		fixed?: boolean
		sidebar?: Snippet
		children?: Snippet
	}

	let {children}: Props = $props()
	let appSettings = $derived(page.data.settings)

	let brightness = $derived(appSettings.brightness)
	let contrast = $derived(appSettings.contrast)
	let initialBrightness = $derived(
		brightness === 'night' ? 'active' : 'inactive',
	)
	let initialContrast = $derived(brightness === 'night' ? 'active' : 'inactive')
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
		inputs.switch[0].initial = initialBrightness
		inputs.switch[1].initial = initialContrast
		return inputs
	})

	// TODO : Initialize settings menu from system settings
</script>

<div class={themeClass}>
	<Header
		id="nav"
		name="nav"
		label=""
		path={page.url.pathname}
		reveal={page.data.nav.reveal}
		actionPath={page.url.pathname}
		formaction="toggleNav"
		items={{
			links,
			settings,
		}}
		breakpoint="sm"
		app={appSettings}
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
