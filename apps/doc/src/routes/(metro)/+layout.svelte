<script lang="ts">
	import type {Snippet} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {links} from '$data/nav'

	const {Header, RevealNav} = ui.recipes
	const {LayoutMetro} = ui.content

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let sidenav = $derived(page.data.sidebar)
	let appSettings = $derived(page.data.settings)

	let brightness = $derived(appSettings.brightness)
	let contrast = $derived(appSettings.contrast)
	let pageClass = $derived(
		ui.utils.format.getClassNameFromPathname(page.url.pathname),
	)
	let themeClass = $derived(
		`${pageClass} settings:${brightness}:${contrast} surface:0:neutral`,
	)
	let settings = $derived.by(() => {
		let inputs = ui.constants.APP_SETTINGS
		inputs.switch[0].initial = brightness === 'night' ? 'active' : 'inactive'
		inputs.switch[1].initial = contrast === 'night' ? 'active' : 'inactive'
		return inputs
	})
</script>

<LayoutMetro {sidenav} theme={themeClass}>
	<div class="main-nav">
		<Header
			id="nav"
			name="nav"
			label="Menu"
			path={page.url.pathname}
			reveal={page.data.nav.reveal}
			actionPath={page.url.pathname}
			formaction="toggleNav"
			dismiss="outside"
			main={links}
			context={settings}
			breakpoint="sm"
			app={appSettings}
		/>
	</div>

	<div class="side-nav">
		<RevealNav
			{...sidenav}
			position={false}
			place="left"
			justify="evenly"
			font="sm"
			size="sm"
			dismiss="outside"
		/>
	</div>

	<div class="zone:content">
		{#if children}
			{@render children()}
		{:else}
			<p class="feedback bare emoji:default">Coming Soon!</p>
		{/if}
	</div>
</LayoutMetro>
