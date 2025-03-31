<script lang="ts">
	import type {Snippet} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {links} from '$data/nav'

	const {Header, RevealNav} = ui.recipes

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	const {LayoutRails} = ui.content

	let sidenav = $derived(page.data.sidebar)
	let appContext = $derived(page.data.appContext)

	let brightness = $derived(appContext.brightness)
	let contrast = $derived(appContext.contrast)
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

<LayoutRails {sidenav} theme={themeClass}>
	<div class="main-header">
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
			breakpoint="xs"
			app={appContext}
		/>
	</div>

	<div class="sidenav">
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
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutRails>
