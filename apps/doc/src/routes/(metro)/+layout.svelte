<script lang="ts">
	import type {Snippet} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {links} from '$data/nav'
	import Footer from '$lib/ui/Footer.svelte'

	const {RevealNav} = ui.recipes
	const {HeaderMetro} = ui.drafts
	const {LayoutGrid} = ui.content

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let mainNav = $derived(page.data.nav)
	let sidenav = $derived(page.data.sidebar)
	let appContext = $derived(page.data.appContext)
	let playgroundClass = $derived(
		page.data.id && page.data.slug ? 'm-zone:playground' : '',
	)

	let playbookClass = $derived(
		page.params.category && page.params.category !== 'raw'
			? 'm-zone:playbook'
			: '',
	)

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
		preferences.display[0].initial =
			brightness === 'night' ? 'active' : 'inactive'
		preferences.display[1].initial =
			contrast === 'blend' ? 'active' : 'inactive'
		return preferences
	})
</script>

<LayoutGrid grid="metro" {sidenav} theme={themeClass}>
	<HeaderMetro
		id="nav"
		name="nav"
		label="Menu"
		path={page.url.pathname}
		reveal={mainNav.reveal}
		actionPath={page.url.pathname}
		formaction="toggleNav"
		dismiss="outside"
		main={links}
		context={appContext}
		{preferences}
		breakpoint="xs"
	/>
	<div class="l:grid m-zone:2">
		<RevealNav
			{...sidenav}
			position={false}
			place="left"
			scroll="y"
			justify="evenly"
			font="sm"
			size="xs"
			dismiss="outside"
		/>
	</div>
	<div class={`l:grid m-zone:3 ${playgroundClass} ${playbookClass}`}>
		{#if children}
			{@render children()}
		{:else}
			<p class="feedback bare emoji:default">Coming Soon!</p>
		{/if}
	</div>
	<div class="l:grid m-zone:4">
		<Footer />
	</div>
</LayoutGrid>
