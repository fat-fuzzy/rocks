<script lang="ts">
	import type {Snippet} from 'svelte'

	import '$lib/styles/css/main.css'

	import {page} from '$app/state'
	import {dev} from '$app/environment'
	import {links} from '$data/nav'
	import ui from '@fat-fuzzy/ui'
	import Footer from '$lib/ui/Footer.svelte'
	import Beacon from '$lib/ui/Beacon.svelte'

	const {Header} = ui.recipes
	const {Popover, Cookies} = ui.drafts

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
	let cookiesPending = $derived(appSettings.consent === undefined)
	let cookiesPartial = $derived(
		appSettings.consent?.analytics || appSettings.consent?.site,
	)
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
		position="sticky"
		placement="top"
		main={links}
		context={settings}
		breakpoint="xs"
		app={appSettings}
	/>
	{#if children}
		{@render children()}
	{:else}
		<p>Nothing to see here</p>
	{/if}

	<Footer />
</div>
<Popover
	id="cookies-banner"
	title="Cookies"
	asset="cookie"
	fixed={cookiesPending}
	container="burrito"
	variant="fill"
	color={cookiesPending ? 'highlight' : cookiesPartial ? 'accent' : 'primary'}
	place="bottom-right"
>
	<Cookies />
</Popover>

{#if !dev && appSettings.consent?.analytics}
	<Beacon />
{/if}
