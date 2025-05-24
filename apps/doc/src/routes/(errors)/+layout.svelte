<script lang="ts">
	import type {Snippet} from 'svelte'

	import '$lib/styles/css/main.css'

	import {page} from '$app/state'
	import {dev} from '$app/environment'
	import {links} from '$data/nav'
	import ui from '@fat-fuzzy/ui'
	import RcScout from '$lib/ui/RcScout.svelte'
	import Beacon from '$lib/ui/Beacon.svelte'

	const {Header} = ui.recipes
	const {Popover, Cookies} = ui.drafts

	type Props = {
		fixed?: boolean
		sidebar?: Snippet
		children?: Snippet
	}

	let {children}: Props = $props()
	let appContext = $derived(page.data.appContext)

	let brightness = $derived(appContext.brightness)
	let contrast = $derived(appContext.contrast)
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
	let footerClass = 'ravioli:xs'
	let aboutContainerClass = $derived(
		pageClass === 'page:home' ? 'ravioli:xl' : '',
	)
	let footerOpen = $derived(pageClass === 'page:home' ? true : false)
	let consentPending = $derived(appContext.consent === undefined)
	let consentPartial = $derived(
		appContext.consent?.analytics || appContext.consent?.site,
	)
	let settings = $derived.by(() => {
		let inputs = ui.constants.APP_SETTINGS
		inputs.display[0].initial = initialBrightness
		inputs.display[1].initial = initialContrast
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
		position="sticky"
		placement="top"
		main={links}
		context={settings}
		breakpoint="sm"
		app={appContext}
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
			<summary class="ravioli:2xs">About</summary>
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
<Popover
	id="consent-banner"
	title="Cookies"
	asset="cookie"
	fixed={consentPending}
	container="burrito"
	variant="fill"
	color={consentPending ? 'highlight' : consentPartial ? 'accent' : 'primary'}
	place="bottom-right"
>
	<Cookies consent={appContext.consent} />
</Popover>

{#if !dev && appContext.consent?.analytics}
	<Beacon />
{/if}
