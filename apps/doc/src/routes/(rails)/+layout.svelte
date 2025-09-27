<script lang="ts">
	import type {Snippet} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {links} from '$data/nav'
	import Footer from '$lib/ui/Footer.svelte'
	import Socials from '$lib/ui/Socials.svelte'

	const {Cookies, HeaderNav, RevealContext} = ui.drafts
	const {RevealNav} = ui.recipes
	const {LayoutGrid} = ui.content
	const {Magic} = ui.blocks
	import {linksSocials} from '$data/nav'

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let mainNav = $derived(page.data.nav)
	let sidenav = $derived(page.data.sidebar)
	let layout = $derived(page.data.layout ?? sidenav.layout)
	let appContext = $derived(page.data.appContext)
	let talk = $derived(page.params.talk)
	let slide = $derived(page.data.content)
	let series = $derived(
		slide?.meta?.series && slide.meta.index > 0
			? slide.meta.series.items.map((id) =>
					page.data.talks.find((slide) => slide.meta.id === id),
				)
			: null,
	)

	type AreaZone = {
		zone: Snippet
		grid?: boolean
		gare?: string
		scroll?: string
		exchange?: boolean
		hug?: boolean
		tag?: string
	}

	const areas: AreaZone[] = $derived([
		{
			zone: zoneHeader,
			grid: true,
			exchange: true,
			tag: 'header',
		},
		{
			zone: zoneContent,
			// hug: layout === 'steam' || layout === 'tram' || layout === 'urbanist',
			grid: true,
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	])
</script>

<LayoutGrid
	{layout}
	{areas}
	{sidenav}
	size="3xs"
	app={appContext}
	path={page.url.pathname}
/>

{#snippet zoneHeader()}
	<div class="navbar l:grid size:3xs align:center bg:inherit">
		<HeaderNav
			id="nav"
			name="nav"
			title="Menu"
			label="Menu"
			size="3xs"
			font="xs"
			variant="outline"
			color="primary"
			asset="home"
			justify="center"
			text="start"
			dismiss="outside"
			auto={true}
			{links}
			path={page.url.pathname}
			reveal={mainNav.reveal}
			actionPath={page.url.pathname}
			breakpoint="xs"
			background="inherit"
			formaction="toggleNav"
		/>
	</div>
	<div
		class={`${sidenav.reveal ?? ''} sidebar surface:0:neutral l:grid size:3xs align:center width:lg height:sm`}
	>
		{#if sidenav.layout === 'tgv'}
			<div class="app-name">
				<Magic spell="fuzzy" size="3xs" mask="text">
					<div class="l:flex align:center justify:center">
						<ff-icon class="emoji:home font:lg"></ff-icon>
						<p class="font:h1 font:lg">Fat Fuzzy</p>
					</div>
				</Magic>
			</div>
		{:else}
			<RevealNav
				{...sidenav}
				position={false}
				area="gare"
				place="ouest"
				layout="rails"
				scroll="y"
				layer={1}
				justify="evenly"
				size="3xs"
				font="xs"
				width="lg"
				height="sm"
				background="neutral"
				dismiss="outside"
			/>
		{/if}
	</div>

	<div class="context l:grid size:3xs bg:inherit">
		<RevealContext
			id="appContext"
			name="appContext"
			label="Settings"
			path={page.url.pathname}
			actionPath={page.url.pathname}
			breakpoint="xs"
			size="3xs"
			font="xs"
			layout="grid"
			formaction="updateSettings"
			justify="center"
			text="start"
			background="inherit"
			context={appContext}
			reveal={appContext.reveal}
		/>
	</div>
{/snippet}

{#snippet zoneContent()}
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback bare emoji:default">Coming Soon!</p>
	{/if}
{/snippet}

{#snippet zoneFooter()}
	{#if talk}
		<Footer>
			<nav
				id="slides-nav"
				class="slides-nav l:flex size:xs align:center justify:end"
			>
				{#if slide.meta.index === 0}
					<a
						href={`/about/speaking/${slide.meta.talk}/slide-1`}
						class="emoji:start justify:start shape:mellow"
					>
						Showtime!
					</a>
				{:else}
					{#if slide.meta.index === 1}
						<a
							href={`/about/speaking/${slide.meta.talk}`}
							class="emoji:default justify:start shape:mellow"
						>
							Intro
						</a>
					{/if}
					{#if slide.meta.index > 1}
						<a
							href={`/about/speaking/${slide.meta.talk}/slide-${slide.meta.index - 1}`}
							class="emoji:point-left justify:start shape:mellow"
						>
							{slide.meta.index - 1}
						</a>
					{/if}
					<p
						class="surface:4:primary shape:round index variant:fill ravioli:2xs"
					>
						{slide.meta.index}
					</p>
					{#if slide.meta.index < series?.length}
						<a
							href={`/about/speaking/${slide.meta.talk}/slide-${slide.meta.index + 1}`}
							class="emoji:point-right justify:end shape:mellow"
						>
							{slide.meta.index + 1}
						</a>
					{/if}
					{#if slide.meta.index === series?.length}
						<p class="emoji:end justify:start">Fin!</p>
					{/if}
				{/if}
			</nav>
		</Footer>
	{:else}
		<Footer>
			{#snippet socials()}
				<Socials links={linksSocials} />
			{/snippet}
			{#snippet actions()}
				{#if appContext.consent}
					<Cookies
						consent={appContext.consent}
						actionPath={appContext.actionPath}
						font="lg"
					/>
				{/if}
			{/snippet}
		</Footer>
	{/if}
{/snippet}
