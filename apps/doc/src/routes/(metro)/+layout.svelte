<script lang="ts">
	import type {Snippet} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {links} from '$data/nav'

	const {RevealNav} = ui.recipes
	const {HeaderMetro} = ui.drafts
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
	<HeaderMetro
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
		app={appSettings}
	>
		{#snippet sidebar()}
			<RevealNav
				{...sidenav}
				position={false}
				place="left"
				justify="evenly"
				font="sm"
				size="2xs"
				dismiss="outside"
			/>
		{/snippet}
	</HeaderMetro>
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
</LayoutMetro>
