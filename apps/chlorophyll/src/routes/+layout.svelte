<script lang="ts">
	import type {Snippet} from 'svelte'
	import type {AreaProps, UiLayout, ViewingPreferences} from '@fat-fuzzy/ui'

	import {setContext, onMount, onDestroy} from 'svelte'
	import ui from '@fat-fuzzy/ui'
	import {page} from '$app/state'
	// @ts-expect-error types not used for css
	import '@fat-fuzzy/style/css'
	import '$lib/styles/css/main.css'

	import {buildNav} from '$data/nav'
	import {initBridge, destroyBridge} from '$lib/aggregates/bridge'
	import {createAggregates} from '$lib/aggregates/container'
	import {createCoords} from '$lib/application/container'
	import Dialog from '$lib/ui/overlays/dialog/Dialog.svelte'

	const {ToggleTree, ToggleReveal, ToggleSettings} = ui.drafts
	const {SkipLinks} = ui.recipes
	const {LayoutGrid} = ui.content
	const {Magic} = ui.blocks

	let {
		children,
	}: {
		children: Snippet
	} = $props()

	/**
	 * Register Contexts
	 */
	const {aggDataLifecycle, aggMetadata, aggDocs, aggPresets} =
		createAggregates()
	const {coordDocs, coordExports, coordImports, coordMetadata, coordPresets} =
		createCoords({
			aggDataLifecycle,
			aggDocs,
			aggMetadata,
			aggPresets,
		})

	setContext('aggDocs', aggDocs)
	setContext('aggMetadata', aggMetadata)
	setContext('aggPresets', aggPresets)

	setContext('coordMetadata', coordMetadata)
	setContext('coordImports', coordImports)
	setContext('coordDocs', coordDocs)
	setContext('coordExports', coordExports)
	setContext('coordPresets', coordPresets)

	/**
	 * Setup page data (loaded / generated)
	 */
	const sidenav = buildNav('chlorophyll')

	let pathname = $derived(page.url.pathname)
	let layout: UiLayout = $derived.by(() => {
		const _page = page.params.page ? page.params.page : page.url.pathname

		switch (_page) {
			case 'build':
			case 'edit':
			case 'preview':
			case 'print':
				return 'railway'
			case '/cv':
				return 'voyager'
			case '/':
				return 'tgv'
			default:
				return 'voyager'
		}
	})

	let base = $derived(page.data.base)
	let structures = $derived(page.data.structures)

	/**
	 * Setup App context (user controlled UI)
	 */
	let appContext: ViewingPreferences = $state({
		brightness: 'system',
		contrast: 'contrast',
		consent: {
			functional: true,
		},
	})

	/**
	 * Setup UI layout
	 */
	const areas: AreaProps[] = $derived([
		{
			zone: zoneHeader,
			grid: true,
			exchange: true,
			tag: 'header',
		},
		{
			zone: zoneContent,
			hug: layout === 'railway',
			grid: true,
		},
		{
			zone: zoneFooter,
			grid: true,
		},
	])

	function updateSettings(event: Event) {
		const target = event.target as HTMLInputElement
		// @ts-expect-error expect target name to be brightness or contrast
		appContext[target.name] = target.value
	}

	onMount(async () => {
		initBridge()

		await coordImports.init({base, structures})
		await aggMetadata.init()
		await aggDocs.init()
		await coordMetadata.init()
		await aggPresets.init()
	})

	onDestroy(() => destroyBridge())
</script>

<LayoutGrid
	{layout}
	{areas}
	{sidenav}
	size="3xs"
	app={appContext}
	path={pathname}
/>

{#snippet zoneHeader()}
	<div class="sidebar hug align:center raviolink">
		{#if sidenav.layout === 'tgv'}
			<div class="app-name">
				<Magic spell="fuzzy" size="3xs" mask="text" uno="herb">
					<p class="font:h1 font:lg hide:md">Chlorophyll</p>
				</Magic>
			</div>
		{:else}
			<nav
				id="sidenav"
				class="font:md height:lg"
				data-testid={`sidenav-${pathname}`}
			>
				<SkipLinks
					id={`skiplinks-${pathname}`}
					text="Skip to content"
					href="#main"
				/>
				<ToggleReveal
					id="sidenav-reveal"
					label={sidenav.label}
					asset={sidenav.asset}
					assetType={sidenav.assetType}
					color={sidenav.color}
					background={sidenav.background}
					variant="bare"
					checked={pathname.startsWith('/cv/') ? false : undefined}
					area="gare"
					coords="ouest"
					shape="square"
					scroll="y"
					layer="1"
					depth={0}
					font="sm"
					width="sm"
					height="lg"
					dismiss="outside"
				>
					<ToggleTree
						{...sidenav}
						id={`sidenav-${pathname}`}
						{pathname}
						preload={true}
						depth={0}
						shape="square"
						width="md"
					/>
				</ToggleReveal>
			</nav>
		{/if}
	</div>

	<div class="context hug raviolink">
		<ToggleReveal
			id="appContext"
			label="Settings"
			color="neutral"
			asset="settings"
			font="sm"
			layout="flex"
			justify="end"
			coords="est"
			depth={0}
			layer="1"
			variant="bare"
			shape="square"
			background="blur"
		>
			<ToggleSettings
				id="appContext-menu"
				name="app-settings"
				label="Settings"
				selected={appContext}
				oninput={updateSettings}
			/>
		</ToggleReveal>
	</div>
{/snippet}

{#snippet zoneContent()}
	{#if children}
		{@render children()}
	{:else}
		<p class="feedback outline status:danger emoji:wip">TODO !</p>
	{/if}
	<Dialog />
{/snippet}

{#snippet zoneFooter()}{/snippet}
