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
	let appContext = $derived(page.data.context)

	let brightness = $derived(appContext.brightness)
	let contrast = $derived(appContext.contrast)
	let pageClass = $derived(
		ui.utils.format.getClassNameFromPathname(page.url.pathname),
	)
	let themeClass = $derived(
		`${pageClass} settings:${brightness}:${contrast} surface:0:neutral`,
	)
	let preferences = $derived.by(() => {
		let preferences = ui.constants.APP_SETTINGS
		preferences.switch[0].initial =
			brightness === 'night' ? 'active' : 'inactive'
		preferences.switch[1].initial = contrast === 'blend' ? 'active' : 'inactive'
		return preferences
	})

	let context = $derived({
		...preferences,
		reveal: appContext.reveal,
	})
</script>

<LayoutMetro {sidenav} theme={themeClass}>
	<div class="main-nav">
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
			{context}
			breakpoint="sm"
		/>
	</div>

	<div class="side-nav">
		<RevealNav
			{...sidenav}
			position={false}
			place="left"
			justify="evenly"
			font="sm"
			size="xs"
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
