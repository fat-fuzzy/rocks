<script lang="ts">
	import type {Snippet} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {links} from '$data/nav'
	import Footer from '$lib/ui/Footer.svelte'

	const {RevealNav} = ui.recipes
	const {HeaderGrid, HeaderNav, RevealContext} = ui.drafts
	const {LayoutGrid} = ui.content

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let mainNav = $derived(page.data.nav)
	let gridLayout = $derived(page.data.layout ?? page.data.nav.layout)
	let sidenav = $derived(page.data.sidebar)
	let appContext = $derived(page.data.appContext)

	let brightness = $derived(appContext.brightness)
	let contrast = $derived(appContext.contrast)
	let preferences = $derived.by(() => {
		let preferences = ui.constants.APP_SETTINGS
		preferences.display[0].initial =
			brightness === 'night' ? 'active' : 'inactive'
		preferences.display[1].initial =
			contrast === 'blend' ? 'active' : 'inactive'
		return preferences
	})

	let areas = $derived(
		sidenav.layout === 'voyager' || sidenav.layout === 'railway'
			? [
					{
						zone: zoneNav1,
						grid: true,
						gare: 'nord',
					},
					{
						zone: zoneNav2,
						grid: true,
						gare: 'ouest',
					},
					{
						zone: zoneAppContext,
						grid: true,
					},
					{
						zone: zoneContent,
						grid: true,
					},
					{
						zone: zoneFooter,
						grid: true,
					},
				]
			: [
					{
						zone: zoneHeader,
						grid: true,
						gare: 'nord',
					},
					{
						zone: zoneNav2,
						grid: true,
						gare: 'ouest',
					},
					{
						zone: zoneContent,
						grid: true,
						scroll: 'y',
					},
					{
						zone: zoneFooter,
						grid: true,
					},
				],
	)
</script>

<LayoutGrid
	layout={gridLayout}
	{areas}
	{sidenav}
	app={appContext}
	path={page.url.pathname}
/>

{#snippet zoneHeader()}
	<HeaderGrid
		id="nav"
		name="nav"
		label="Menu"
		font="sm"
		path={page.url.pathname}
		reveal={mainNav.reveal}
		actionPath={page.url.pathname}
		formaction="toggleNav"
		dismiss="outside"
		main={links}
		context={appContext}
		{preferences}
		breakpoint="xs"
		layout={sidenav.layout}
	/>
{/snippet}

{#snippet zoneNav1()}
	<div class="navbar">
		<HeaderNav
			id="nav"
			name="nav"
			label="Menu"
			font="sm"
			title="Menu"
			variant="outline"
			asset="home"
			justify="start"
			dismiss="outside"
			auto={true}
			{links}
			path={page.url.pathname}
			reveal={mainNav.reveal}
			actionPath={page.url.pathname}
			breakpoint="xs"
			formaction="toggleNav"
		/>
	</div>
{/snippet}

{#snippet zoneNav2()}
	<RevealNav
		{...sidenav}
		position={false}
		place="left"
		scroll="y"
		justify="evenly"
		size="md"
		font="sm"
		dismiss="outside"
	/>
{/snippet}

{#snippet zoneAppContext()}
	<RevealContext
		id="appContext"
		name="appContext"
		label="Settings"
		path={page.url.pathname}
		actionPath={page.url.pathname}
		breakpoint="xs"
		size="md"
		font="sm"
		formaction="updateSettings"
		items={preferences}
		onupdate={preferences.onupdate}
		reveal={appContext.reveal}
	>
		<ul class="links:settings end unstyled">
			{#each preferences.links as { title, url, shape, size, asset }}
				<li>
					<a
						class={`shape:${shape} ${asset} size:${size}`}
						href={url}
						target="_blank"
						rel="noreferrer"
						{title}
						aria-label={title}
					>
					</a>
				</li>
			{/each}
		</ul>
	</RevealContext>
{/snippet}

{#snippet zoneContent()}
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
{/snippet}

{#snippet zoneFooter()}
	<Footer />
{/snippet}
