<script lang="ts">
	import type {Snippet} from 'svelte'

	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	import {linksSocials} from '$data/nav'
	import Footer from '$lib/ui/Footer.svelte'
	import Socials from '$lib/ui/Socials.svelte'

	const {Cookies} = ui.drafts
	const {RevealNav} = ui.recipes
	const {LayoutGrid} = ui.content
	const {Magic} = ui.blocks

	type Props = {
		children: Snippet
	}
	let {children}: Props = $props()

	let sidenav = $derived(page.data.sidebar)
	let talk = $derived(page.params.talk)
	let layout = $derived(page.data.layout ?? sidenav.layout)
	let appContext = $derived(page.data.appContext)
	let slide = $derived(page.data.content)

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

	let series = $derived(
		slide.meta.series && slide.meta.index > 0
			? slide.meta.series.items.map((id) =>
					page.data.talks.find((slide) => slide.meta.id === id),
				)
			: null,
	)
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
				class="slides-nav l:flex size:md align:center justify:end"
			>
				{#if slide.meta.index === 0}
					<a
						href={`/speaking/${slide.meta.talk}/slide-1`}
						class="emoji:start justify:start shape:mellow"
					>
						Showtime!
					</a>
				{:else}
					{#if slide.meta.index === 1}
						<p class="emoji:default justify:start">Intro</p>
					{/if}
					{#if slide.meta.index > 1}
						<a
							href={`/speaking/${slide.meta.talk}/slide-${slide.meta.index - 1}`}
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
							href={`/speaking/${slide.meta.talk}/slide-${slide.meta.index + 1}`}
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
