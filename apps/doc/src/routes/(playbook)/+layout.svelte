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
	let appSettings = $derived(page.data.settings)

	let brightness = $derived(appSettings.brightness)
	let contrast = $derived(appSettings.contrast)
	let settings = $derived.by(() => {
		let inputs = ui.constants.APP_SETTINGS
		inputs.switch[0].initial = brightness === 'night' ? 'active' : 'inactive'
		inputs.switch[1].initial = contrast === 'night' ? 'active' : 'inactive'
		return inputs
	})
</script>

<LayoutRails {sidenav}>
	<div class="main-header">
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
			app={{settings}}
		/>
	</div>

	<div class="sidenav">
		<RevealNav
			{...sidenav}
			position={false}
			place="left"
			justify="between"
			size="md"
			dismiss="click"
		/>
	</div>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutRails>
